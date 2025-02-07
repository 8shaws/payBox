import { Router } from "express";
import {
  SecretValid,
  WALLET_CACHE_EXPIRE,
  WalletAccountGet,
  dbResStatus,
  responseStatus,
} from "@paybox/common";
import {
  delWallet,
  getAccountsFromWalletId,
  getSecretPhase,
  getWallets,
  checkPassword,
} from "@paybox/backend-common";
import { Redis } from "..";

export const walletRouter = Router();

walletRouter.post("/secret", checkPassword, async (req, res) => {
  try {
    //@ts-ignore
    const id = req.id;
    const { walletId } = SecretValid.parse(req.body);

    const query = await getSecretPhase(walletId, id);
    if (query.status == dbResStatus.Error || query.secret == undefined) {
      return res
        .status(503)
        .json({ msg: "Database Error", status: responseStatus.Error });
    }
    return res.status(200).json({
      status: responseStatus.Ok,
      secret: query.secret,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: responseStatus.Error,
      msg: "Internal error",
      error: error,
    });
  }
});

walletRouter.get("/accounts", async (req, res) => {
  try {
    //@ts-ignore
    const id = req.id;
    if (id) {
      const { walletId } = WalletAccountGet.parse(req.query);

      // Cache
      const cacheWallet = await Redis.getRedisInst().wallet.getWallet(walletId);
      if (cacheWallet?.accounts) {
        return res.status(200).json({
          accounts: cacheWallet.accounts,
          status: responseStatus.Ok,
        });
      }
      const query = await getAccountsFromWalletId(walletId);
      if (query.status == dbResStatus.Error || query.accounts == undefined) {
        return res
          .status(503)
          .json({ msg: "Database Error", status: responseStatus.Error });
      }
      // Cache
      await Redis.getRedisInst().wallet.cacheWallet(
        walletId,
        {
          clientId: id,
          id: walletId,
          accounts: query.accounts,
        },
        WALLET_CACHE_EXPIRE,
      );
      return res.status(200).json({
        accounts: query.accounts,
        status: responseStatus.Ok,
      });
    }
    return res
      .status(500)
      .json({ status: responseStatus.Error, msg: "Jwt error" });
  } catch (error) {}
});

walletRouter.delete("/", async (req, res) => {
  try {
    //@ts-ignore
    const id = req.id;
    if (id) {
      const { walletId } = SecretValid.parse(req.query);

      const deleteSecret = await delWallet(walletId, id);
      if (deleteSecret.status == dbResStatus.Error) {
        return res
          .status(503)
          .json({ msg: "Database Error", status: responseStatus.Error });
      }
      if (deleteSecret.accounts?.length == 0) {
        return res
          .status(404)
          .json({ status: responseStatus.Error, msg: "Not found" });
      }
      Redis.getRedisInst().deleteHash(walletId);
      deleteSecret.accounts?.map(async (account) => {
        Redis.getRedisInst().deleteHash(account.id);
      });
      return res
        .status(200)
        .json({ status: responseStatus.Ok, msg: "Deleted" });
    }
    return res
      .status(500)
      .json({ status: responseStatus.Error, msg: "Jwt error" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: responseStatus.Error, msg: "Jwt error" });
  }
});

walletRouter.get("/", async (req, res) => {
  try {
    //@ts-ignore
    const id = req.id;
    const query = await getWallets(id);
    if (query.status == dbResStatus.Error || query.wallets == undefined) {
      return res
        .status(503)
        .json({ msg: "Database Error", status: responseStatus.Error });
    }
    return res.status(200).json({
      wallets: query.wallets,
      status: responseStatus.Ok,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: responseStatus.Error, msg: "Jwt error" });
  }
});
