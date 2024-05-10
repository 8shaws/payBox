import {
  Network,
  TokenCreateSchema,
  dbResStatus,
  responseStatus,
} from "@paybox/common";
import { Router } from "express";
import { SolTokenOps } from "@paybox/blockchain";
import { checkPassword, getNetworkPrivateKey } from "@paybox/backend-common";
import { insertToken } from "../db/token";
import { insertAta } from "../db/ata";
import { decryptWithPassword } from "../auth";

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
