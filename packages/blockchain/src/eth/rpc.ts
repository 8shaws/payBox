import { InfuraProvider, ethers } from "ethers";
import { EthCluster, Network, TxnStatus, TxnType } from "@paybox/common";
import { ETH_NODE_API_KEY } from "../config";

export class EthRpc {
  private provider: InfuraProvider;
  private static instance: EthRpc;

  private constructor(cluster: EthCluster = EthCluster.Sepolia) {
    this.provider = new ethers.InfuraProvider(cluster, ETH_NODE_API_KEY);
  }

  public static getInstance(cluster: EthCluster = EthCluster.Sepolia): EthRpc {
    if (!this.instance) {
      this.instance = new EthRpc(cluster);
    }
    return this.instance;
  }

  async getTxn(
    hash: string,
  ): Promise<Omit<TxnType, "id" | "clientId" | "time"> | null> {
    try {
      const txn = await this.provider.getTransaction(hash);
      let minedBlock = await txn?.confirmations();
      if (minedBlock && minedBlock >= 12) {
        return {
          amount: Number(txn?.value),
          blockHash: txn?.blockHash || "",
          fee: Number(txn?.gasPrice),
          from: txn?.from || "",
          to: txn?.to || "",
          hash,
          network: Network.Eth,
          chainId: Number(txn?.chainId),
          status: TxnStatus.Completed,
          slot: txn?.nonce,
        };
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async getBalance(address: string): Promise<string> {
    const balance = await this.provider.getBalance(address);
    return ethers.formatEther(balance);
  }
  async getLatestBlockNumber(): Promise<number> {
    return await this.provider.getBlockNumber();
  }
  async getGasPrice(): Promise<string> {
    const feeData = await this.provider.getFeeData();
    return ethers.formatUnits(feeData.gasPrice || 0, "gwei");
  }
  async estimateGas(transaction: ethers.TransactionRequest): Promise<string> {
    const gasEstimate = await this.provider.estimateGas(transaction);
    return gasEstimate.toString();
  }
  async getTokenBalance(
    tokenAddress: string,
    walletAddress: string,
  ): Promise<string> {
    const abi = ["function balanceOf(address) view returns (uint256)"];
    const contract = new ethers.Contract(tokenAddress, abi, this.provider);
    const balance = await contract.balanceOf(walletAddress);
    return ethers.formatUnits(balance, 18); // Assuming 18 decimals, adjust if needed
  }
  async sendRawTransaction(
    signedTx: string,
  ): Promise<ethers.TransactionResponse> {
    return await this.provider.broadcastTransaction(signedTx);
  }
  async getTransactionReceipt(
    hash: string,
  ): Promise<ethers.TransactionReceipt | null> {
    return await this.provider.getTransactionReceipt(hash);
  }
  async waitForTransaction(
    hash: string,
    confirmations: number = 1,
  ): Promise<ethers.TransactionReceipt | null> {
    return await this.provider.waitForTransaction(hash, confirmations);
  }
  async getBlock(
    blockHashOrBlockTag: string | number,
  ): Promise<ethers.Block | null> {
    return await this.provider.getBlock(blockHashOrBlockTag);
  }
  updateProvider(cluster: EthCluster) {
    this.provider = new ethers.InfuraProvider(cluster, ETH_NODE_API_KEY);
  }
}
