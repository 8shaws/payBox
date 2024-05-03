import {
  EthCluster,
  Network,
  SolCluster,
  TRANSACTION_CACHE_EXPIRE,
  TxnQeuryByHash,
  TxnSendQuery,
  TxnType,
  TxnsQeury,
  responseStatus,
  unixToISOString,
} from "@paybox/common";
import { Router } from "express";
import { checkPassword, getAllTxn, getNetworkPrivateKey, getTxnByHash, getTxns, insertTxn } from "@paybox/backend-common";
import { Redis, calculateGas, decryptWithPassword } from "..";
import { txnCheckAddress } from "../auth/middleware";
import { dbResStatus } from "../types/client";
import { Cluster } from "@solana/web3.js";
import { INFURA_PROJECT_ID } from "../config";
import { SolOps, EthOps } from "@paybox/blockchain";
import { Worker } from "../workers/txn";

export const txnRouter = Router();

txnRouter.post("/send", async (req, res) => {
  try {
    //@ts-ignore
    const id = req.id;
    //@ts-ignore
    if (id) {
      const { from, amount, to, network, cluster, password: hashPassword } = TxnSendQuery.parse(
        req.body,
      );

      let { privateKey: hashedPrivate, status } = await getNetworkPrivateKey(from, network);
      if (status == dbResStatus.Error || !hashedPrivate) {
        return res
          .status(400)
          .json({ status: responseStatus.Error, msg: "No such address in database" });
      }
      let fromPrivateKey = decryptWithPassword(hashedPrivate, hashPassword);

      if (network == Network.Eth) {
        const transaction = await EthOps.getInstance().acceptTxn({ amount, to, from: fromPrivateKey });
        if (!transaction) {
          return res
            .status(400)
            .json({ status: responseStatus.Error, msg: "Transaction failed" });
        }

        
        return res
          .status(200)
          .json({ status: responseStatus.Ok, signature: transaction });
      }
      let sig;
      if (network == Network.Sol) {
        sig = await SolOps.getInstance().acceptTxn({ from: fromPrivateKey, amount, to });
        if (!sig) {
          return res
            .status(400)
            .json({ status: responseStatus.Error, msg: "Transaction failed" });
        }
        
        return res
          .status(200)
          .json({ status: responseStatus.Ok, signature: sig });
      }
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: responseStatus.Error, msg: "Internal Server Error" });
  }
});

/**
 * http://domain.dev/txn/get?network=mainnet&network=testnet&network=other&count=4
 */
txnRouter.get("/getMany", async (req, res) => {
  try {
    //@ts-ignore
    const id = req.id as string;
    if (id) {
      let { networks, count } = TxnsQeury.parse(req.query);
      //Db query
      const txns = await getTxns({ networks, count, clientId: id });
      if (txns.status == dbResStatus.Error) {
        return res
          .status(503)
          .json({ status: responseStatus.Error, msg: "Database Error" });
      }
      await Redis.getRedisInst().txn.cacheTxns(
        `${id}_txns_${count}_${Date.now()}`,
        txns.txns as TxnType[],
        TRANSACTION_CACHE_EXPIRE
      );
      return res
        .status(200)
        .json({ txns: txns.txns as TxnType[], status: responseStatus.Ok });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: responseStatus.Error, msg: "Internal Server Error" });
  }
});

txnRouter.get("/get", async (req, res) => {
  try {
    //@ts-ignore
    const id = req.id as string;
    if (id) {
      let { network, hash } = TxnQeuryByHash.parse(req.query);
      /**
       * Cache
       */
      const isTxn = await Redis.getRedisInst().txn.cacheGetTxnBySign(hash);
      if (isTxn) {
        return res.status(302).json({ txn: isTxn, status: responseStatus.Ok });
      }
      //Db query
      const txn = await getTxnByHash({ network, hash, clientId: id });
      if (txn.status == dbResStatus.Error) {
        return res
          .status(503)
          .json({ status: responseStatus.Error, msg: "Database Error" });
      }
      await Redis.getRedisInst().txn.cacheTxn(txn.id as string, txn.txn as TxnType, TRANSACTION_CACHE_EXPIRE);
      return res.status(200).json({ txn, status: responseStatus.Ok });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: responseStatus.Error, msg: "Internal Server Error" });
  }
});

txnRouter.get("/getAll", async (req, res) => {
  try {
    //@ts-ignore
    const id = req.id as string;
    if (id) {
      const txn = await getAllTxn({ clientId: id });
      if (txn.status == dbResStatus.Error) {
        return res
          .status(503)
          .json({ status: responseStatus.Error, msg: "Database Error" });
      }
      // await Redis.getRedisInst().cacheTxns(`${id}_txns`, txn.txns as TxnType[]);
      return res
        .status(200)
        .json({ txns: txn.txns, status: responseStatus.Ok });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: responseStatus.Error, msg: "Internal Server Error" });
  }
});
