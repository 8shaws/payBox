import {
  MintTokenSchema,
  Network,
  TokenCreateSchema,
  TopicTypes,
  TxnTopic,
  dbResStatus,
  responseStatus,
} from "@paybox/common";
import { Router } from "express";
import { SolTokenOps } from "@paybox/blockchain";
import { checkPassword, getNetworkPrivateKey } from "@paybox/backend-common";
import { getTokens, insertToken } from "../db/token";
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

tokenRouter.get("/", async (req, res) => {
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
