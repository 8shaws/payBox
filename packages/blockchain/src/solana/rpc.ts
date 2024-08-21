import {
  Network,
  SolCluster,
  TokenTxn,
  TxnStatus,
  TxnType,
} from "@paybox/common";
import {
  Cluster,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  clusterApiUrl,
} from "@solana/web3.js";

export class SolRpc {
  private static instance: SolRpc;
  private connection: Connection;

  private constructor(cluster: Cluster = SolCluster.Devnet) {
    this.connection = new Connection(clusterApiUrl(cluster));
  }

  public static getInstance(cluster: Cluster = SolCluster.Devnet) {
    if (!this.instance) {
      this.instance = new SolRpc(cluster);
    }
    return this.instance;
  }

  async getTxn(
    hash: string,
  ): Promise<Omit<TxnType, "id" | "clientId" | "time"> | null> {
    try {
      const txn = await this.connection.getParsedTransaction(hash);
      if (txn === null) {
        return null;
      }

      return {
        //@ts-ignore
        amount: txn.meta?.postBalances[0] - txn.meta?.preBalances[0],
        blockHash: txn.transaction.message.recentBlockhash,
        fee: Number(txn.meta?.fee),
        from: txn.transaction.message.accountKeys
          .filter(({ signer }) => signer)[0]
          .pubkey.toBase58(),
        to: txn.transaction.message.accountKeys
          .filter(({ signer }) => !signer)[0]
          .pubkey.toBase58(),
        hash,
        network: Network.Sol,
        slot: txn.slot,
        status: TxnStatus.Completed,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getTokenTxn(hash: string): Promise<TokenTxn | null> {
    const txn = await this.connection.getParsedTransaction(hash);
    if (txn === null) {
      return null;
    }
    return {
      amount:
        //@ts-ignore
        txn.meta?.postTokenBalances[0]?.uiTokenAmount?.uiAmount -
        //@ts-ignore
        txn.meta?.preTokenBalances[0]?.uiTokenAmount?.uiAmount,
      blockHash: txn.transaction.message.recentBlockhash,
      fromAta:
        //@ts-ignore
        txn.meta?.postTokenBalances.at(-1)?.owner || "",
      //@ts-ignore
      toAta: txn.meta?.postTokenBalances[0]?.owner,
      fee: Number(txn.meta?.fee),
      //@ts-ignore
      token: txn.meta?.postTokenBalances[0]?.mint,
      hash,
      network: Network.Sol,
      slot: txn.slot,
      status: TxnStatus.Completed,
      time: new Date().toISOString(),
    };
  }
  async getBalance(publicKey: string): Promise<number> {
    try {
      const balance = await this.connection.getBalance(
        new PublicKey(publicKey),
      );
      return balance / LAMPORTS_PER_SOL;
    } catch (error) {
      console.error("Error fetching balance:", error);
      throw error;
    }
  }
  async getLatestBlockHeight(): Promise<number> {
    try {
      return await this.connection.getSlot("finalized");
    } catch (error) {
      console.error("Error fetching latest block height:", error);
      throw error;
    }
  }
  async getTokenAccountBalance(tokenAddress: string): Promise<number> {
    try {
      const balance = await this.connection.getTokenAccountBalance(
        new PublicKey(tokenAddress),
      );
      return balance.value.uiAmount || 0;
    } catch (error) {
      console.error("Error fetching token account balance:", error);
      throw error;
    }
  }
  async isTransactionConfirmed(hash: string): Promise<boolean> {
    try {
      const status = await this.connection.getSignatureStatus(hash);
      return (
        status.value?.confirmationStatus === "confirmed" ||
        status.value?.confirmationStatus === "finalized"
      );
    } catch (error) {
      console.error("Error checking transaction confirmation:", error);
      throw error;
    }
  }
  async getAccountInfo(publicKey: string): Promise<AccountInfo<Buffer> | null> {
    try {
      return await this.connection.getAccountInfo(new PublicKey(publicKey));
    } catch (error) {
      console.error("Error fetching account info:", error);
      throw error;
    }
  }
}
