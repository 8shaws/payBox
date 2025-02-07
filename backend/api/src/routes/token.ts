import {
  GenAtaSchema,
  GetTokenSchema,
  InsertTokenTxn,
  MintTokenSchema,
  Network,
  TokenCreateSchema,
  TopicTypes,
  TransferTokenSchema,
  TxnTopic,
  dbResStatus,
  responseStatus,
} from "@paybox/common";
import { Router } from "express";
import { SolRpc, SolTokenOps } from "@paybox/blockchain";
import { checkPassword, getNetworkPrivateKey } from "@paybox/backend-common";
import { getToken, getTokens, insertAtaOne, insertToken } from "../db/token";
import { insertAta } from "../db/ata";
import { decryptWithPassword } from "../auth";
import { Worker } from "../workers/txn";
import { Redis } from "..";

export const tokenRouter = Router();

tokenRouter.post("/create", checkPassword, async (req, res) => {
  try {
    //@ts-ignore
    const id = req.id;
    //@ts-ignore
    const hashPassword = req.hashPassword;
    if (id) {
      const { name, description, authority, network } = TokenCreateSchema.parse(
        req.body,
      );

      let { status, privateKey } = await getNetworkPrivateKey(
        authority,
        network,
      );
      if (status == dbResStatus.Error || !privateKey) {
        return res.status(404).json({
          msg: "That account is not Found in Database...",
          status: responseStatus.Error,
        });
      }
      privateKey = await decryptWithPassword(privateKey, hashPassword);

      let instance;

      switch (network) {
        case Network.Sol:
          instance = await SolTokenOps.getInstance().createToken(privateKey);
          break;
        case Network.Eth:
          break;

        default:
          return res.status(404).json({
            msg: "Sorry, We don't yet Support tokens on that chain",
            status: responseStatus.Error,
          });
      }

      if (!instance) {
        return res.status(404).json({
          msg: "Sorry, We don't yet Support tokens on that chain",
          status: responseStatus.Error,
        });
      }

      const { status: insertTokenStatus, id: tokenId } = await insertToken(
        name,
        authority,
        description,
        network,
        instance.mintPub,
        instance.mintPrivate,
        id,
      );
      if (insertTokenStatus == dbResStatus.Error || !tokenId) {
        return res.status(500).json({
          msg: "Inserting Token Database Error",
          status: responseStatus.Error,
        });
      }

      const { status: insertAtaStatus, id: ataId } = await insertAta(
        instance.ata,
        instance.mintPub,
        id,
        true,
        authority,
      );
      if (insertAtaStatus == dbResStatus.Error || !ataId) {
        return res.status(500).json({
          msg: "Instering ATA Database Error",
          status: responseStatus.Error,
        });
      }

      return res.status(200).json({
        status: responseStatus.Ok,
        msg: "Token Created Successfully",
        token: instance.mintPub,
        ata: instance.ata,
      });
    }
    return res.status(401).json({
      status: responseStatus.Error,
      msg: "Auth Error",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      msg: "Internal Server Error",
      status: responseStatus.Error,
    });
  }
});

tokenRouter.post("/mint", checkPassword, async (req, res) => {
  try {
    //@ts-ignore
    const id = req.id;
    //@ts-ignore
    const hashPassword = req.hashPassword;

    if (id && hashPassword) {
      const { mint, authority, network, tokens, ata, username } =
        MintTokenSchema.parse(req.body);

      let { status, privateKey } = await getNetworkPrivateKey(
        authority,
        network,
      );
      if (status == dbResStatus.Error || !privateKey) {
        return res.status(404).json({
          msg: "That account is not Found in Database...",
          status: responseStatus.Error,
        });
      }
      privateKey = await decryptWithPassword(privateKey, hashPassword);

      let instance;
      switch (network) {
        case Network.Sol:
          instance = await SolTokenOps.getInstance().mintToken(
            privateKey,
            mint,
            ata,
            tokens,
          );
          break;

        case Network.Eth:
          break;

        default:
          return res.status(404).json({
            msg: `${network} is not yet Supported...`,
            status: responseStatus.Error,
          });
      }

      if (!instance) {
        return res.status(404).json({
          msg: "Sorry, We don't yet Support tokens on that chain",
          status: responseStatus.Error,
        });
      }

      console.log(instance);

      try {
        //publishing to push the txn
        await Worker.getInstance().publishOne({
          topic: TopicTypes.Txn,
          message: [
            {
              partition: 0,
              key: instance,
              value: JSON.stringify({
                type: TxnTopic.Finalized,
                chain: network,
                from: id,
                to: username,
                hash: instance,
                isTokenTxn: true,
                isMint: true,
              }),
            },
          ],
        });
      } catch (e) {
        console.log(e);
        return res.status(500).json({
          msg: "Error publishing the txn",
          status: responseStatus.Error,
        });
      }

      return res.status(200).json({
        msg: `${tokens} minted successfully...`,
        status: responseStatus.Ok,
      });
    }

    return res.status(401).json({
      msg: "Auth Error",
      status: responseStatus.Error,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      msg: "Internal Server Error",
      status: responseStatus.Error,
    });
  }
});

tokenRouter.get("/all", async (req, res) => {
  try {
    //@ts-ignore
    const id = req.id;
    if (id) {
      const { status, tokens } = await getTokens(id);
      if (status == dbResStatus.Error || !tokens) {
        return res.status(404).json({
          msg: "Tokens not found in db...",
          status: responseStatus.Error,
        });
      }

      await Redis.getRedisInst().tokens.cacheTokens(
        `tokens:${id}`,
        tokens,
        60 * 60,
      );

      return res.status(200).json({
        tokens,
        status: responseStatus.Ok,
      });
    }
    return res.status(401).json({
      status: responseStatus.Error,
      msg: "Auth Error",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      msg: "Internal Server Error",
      status: responseStatus.Error,
    });
  }
});

tokenRouter.get("/", async (req, res) => {
  try {
    //@ts-ignore
    const id = req.id;
    if (id) {
      const { tokenId } = GetTokenSchema.parse(req.query);

      let cacheToken =
        await Redis.getRedisInst().tokens.getCachedToken(tokenId);
      if (cacheToken && cacheToken.id) {
        return res.status(302).json({
          status: responseStatus.Ok,
          token: cacheToken,
        });
      }

      const { status, token } = await getToken(tokenId);
      if (status == dbResStatus.Error || !token) {
        return res.status(404).json({
          msg: "Token not found in db...",
          status: responseStatus.Error,
        });
      }

      await Redis.getRedisInst().tokens.cacheTokens(tokenId, [token], 60 * 60);

      return res.status(200).json({
        token,
        status: responseStatus.Ok,
      });
    }
    return res.status(401).json({
      msg: "Auth Error",
      status: responseStatus.Error,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      msg: "Internal Server Error",
      status: responseStatus.Error,
    });
  }
});

tokenRouter.post("/ata", checkPassword, async (req, res) => {
  try {
    //@ts-ignore;
    const id = req.id;
    //@ts-ignore;
    const hashPassword = req.hashPassword;
    if (id) {
      const { token, authority, network } = GenAtaSchema.parse(req.body);

      let { status, privateKey } = await getNetworkPrivateKey(
        authority,
        network,
      );
      if (status == dbResStatus.Error || !privateKey) {
        return res.status(404).json({
          msg: "That account is not Found in Database...",
          status: responseStatus.Error,
        });
      }
      privateKey = await decryptWithPassword(privateKey, hashPassword);

      let instance;
      switch (network) {
        case Network.Sol:
          instance = await SolTokenOps.getInstance().genAta(token, privateKey);
          break;
        case Network.Eth:
          break;
        default:
          break;
      }

      if (!instance) {
        return res.status(404).json({
          status: responseStatus.Error,
          msg: `Sorry, ${network} is not yet supported...`,
        });
      }

      const { status: insertAtaStatus, ataId } = await insertAtaOne(
        authority,
        id,
        false,
        instance,
        token,
      );
      if (insertAtaStatus == dbResStatus.Error || !ataId) {
        return res.status(500).json({
          msg: "Insert Db Error",
          status: responseStatus.Error,
        });
      }

      return res.status(200).json({
        status: responseStatus.Ok,
        ataId,
      });
    }
    return res.status(401).json({
      status: responseStatus.Error,
      msg: "Auth Error",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      msg: "Internal Server Error",
      status: responseStatus.Error,
    });
  }
});

tokenRouter.post("/transfer", checkPassword, async (req, res) => {
  try {
    //@ts-ignore
    const id = req.id;
    //@ts-ignore
    const hashPassword = req.hashPassword;
    if (id) {
      const { amount, fromAta, pubKey, toAta, token, network, username } =
        TransferTokenSchema.parse(req.body);

      let { status, privateKey } = await getNetworkPrivateKey(pubKey, network);
      if (status == dbResStatus.Error || !privateKey) {
        return res.status(404).json({
          msg: "That account is not Found in Database...",
          status: responseStatus.Error,
        });
      }
      privateKey = await decryptWithPassword(privateKey, hashPassword);

      let instance;

      switch (network) {
        case Network.Sol:
          instance = await SolTokenOps.getInstance().transferToken(
            privateKey,
            fromAta,
            toAta,
            amount,
          );
          break;

        case Network.Eth:
          break;

        default:
          break;
      }

      if (!instance) {
        return res.status(404).json({
          status: responseStatus.Error,
          msg: "Sorry, that chain is not yet supported...",
        });
      }

      try {
        //publishing to push the txn
        await Worker.getInstance().publishOne({
          topic: TopicTypes.Txn,
          message: [
            {
              partition: 0,
              key: instance,
              value: JSON.stringify({
                type: TxnTopic.Finalized,
                chain: network,
                from: id,
                to: username,
                hash: instance,
                isTokenTxn: true,
                isMint: true,
              }),
            },
          ],
        });
      } catch (e) {
        console.log(e);
        return res.status(500).json({
          msg: "Error publishing the txn",
          status: responseStatus.Error,
        });
      }

      //index the account from frontend
      return res.status(200).json({
        status: responseStatus.Ok,
        txnId: instance,
      });
    }

    return res.status(401).json({
      status: responseStatus.Error,
      msg: "Auth Error",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      msg: "Internal Server Error",
      status: responseStatus.Error,
    });
  }
});

tokenRouter.get("/insertTxn", async (req, res) => {
  try {
    //@ts-ignore
    const id = req.id;
    if (id) {
      const { hash, network } = InsertTokenTxn.parse(req.query);

      let instance;

      switch (network) {
        case Network.Sol:
          instance = await SolRpc.getInstance().getTokenTxn(hash);
          break;

        case Network.Eth:
          break;

        default:
          break;
      }

      if (!instance) {
        return res.status(404).json({
          status: responseStatus.Error,
          msg: "Sorry, that network is not yet supported...",
        });
      }
    }
    return res.status(401).json({
      status: responseStatus.Error,
      msg: "Auth Error",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: responseStatus.Error,
      msg: "Internal Server Error",
    });
  }
});
