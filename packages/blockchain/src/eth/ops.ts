import { InfuraProvider, ethers } from "ethers";
import {
  AcceptEthTxn,
  ChainAccountPrivate,
  EthChainId,
  EthCluster,
  Network,
  WalletKeys,
} from "@paybox/common";
import { ETH_NODE_API_KEY } from "../config";
import { encryptWithPassword } from "@paybox/backend-common";

export class EthOps {
  private httpProvider: InfuraProvider;
  private static instance: EthOps;

  /**
   *
   * @param network
   * @param projectId
   * @param address
   * @param filter
   */
  private constructor(net: EthCluster = EthCluster.Sepolia) {
    this.httpProvider = new ethers.InfuraProvider(net, ETH_NODE_API_KEY);
  }

  public static getInstance(net: EthCluster = EthCluster.Sepolia): EthOps {
    if (!this.instance) {
      this.instance = new EthOps(net);
    }
    return this.instance;
  }

  /**
   *
   * @param secretPhrase
   * @returns
   */
  createWallet(secretPhrase: string, hashPassword: string): WalletKeys {
    const wallet = ethers.Wallet.fromPhrase(secretPhrase);

    const keys: WalletKeys = {
      privateKey: encryptWithPassword(wallet.privateKey, hashPassword),
      publicKey: wallet.address,
    };
    return keys;
  }

  /**
   *
   * @param secretPhrase
   * @returns
   */
  createAccount(secretPhrase: string, hashPassword: string): WalletKeys {
    const accountIndex = Math.round(Date.now() / 1000);
    const path = `m/44'/60'/${accountIndex}'/0/0`;
    const wallet = ethers.HDNodeWallet.fromPhrase(
      secretPhrase,
      undefined,
      path,
    );

    const keys: WalletKeys = {
      privateKey: encryptWithPassword(wallet.privateKey, hashPassword),
      publicKey: wallet.address,
    };
    return keys;
  }

  /**
   *
   * @param mnemonic
   * @returns
   */
  fromPhrase(mnemonic: string, count: number = 1): ChainAccountPrivate[] {
    const accounts: ChainAccountPrivate[] = [];

    for (let i = 0; i < count; i++) {
      const path = `m/44'/60'/${i}'/0/0`;
      const wallet = ethers.HDNodeWallet.fromPhrase(mnemonic, undefined, path);
      accounts.push({
        chain: {
          chainId: EthChainId.Mainnet,
          name: "Ethereum",
          network: Network.Eth,
        },
        publicKey: wallet.address,
        privateKey: wallet.privateKey,
      });
    }
    return accounts;
  }

  /**
   *
   * @param secretKey
   * @returns
   */
  fromSecret(secretKey: string, hashPassword: string): WalletKeys {
    const wallet = new ethers.Wallet(secretKey);

    const keys: WalletKeys = {
      privateKey: encryptWithPassword(wallet.privateKey, hashPassword),
      publicKey: wallet.address,
    };
    return keys;
  }

  async acceptTxn({ to, amount, from }: AcceptEthTxn) {
    try {
      let wallet = new ethers.Wallet(from, this.httpProvider);

      let transaction = {
        to: to,
        value: ethers.parseEther(amount.toString()), // Convert amount to wei
      };
      let tx = await wallet.sendTransaction(transaction);

      return tx;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  /**
   * to check if the pending transaction confirmed or not
   * @param transactionHash
   * @returns
   */
  async isTransactionConfirmed(transactionHash: string): Promise<boolean> {
    try {
      const transactionReceipt =
        await this.httpProvider.waitForTransaction(transactionHash);

      if (transactionReceipt && transactionReceipt.blockHash.length > 0) {
        console.log(
          `Transaction ${transactionHash} is confirmed with ${transactionReceipt.confirmations} confirmations.`,
        );
        return true;
      } else {
        console.log(
          `Transaction ${transactionHash} is still pending or has not reached the required confirmations.`,
        );
        return false;
      }
    } catch (error) {
      console.error("Error checking transaction confirmation:", error);
      return false;
    }
  }

  async checkAddress(address: string): Promise<boolean> {
    try {
      const balance = BigInt(await this.httpProvider.getBalance(address));
      const code = await this.httpProvider.getCode(address);
      console.log(code, "code");
      console.log(balance, "balance");
      if (code !== "0x") {
        console.log(`Address ${address} is a contract address`);
        return true;
      }

      // Check if the address is an EOA
      if (balance !== BigInt(0)) {
        console.log(
          `Address ${address} is an externally owned address with balance`,
        );
        return true;
      }

      console.log(`Address ${address} does not exist on the blockchain`);
      return false;
    } catch (error) {
      console.error("Error checking account confirmation:", error);
      return false;
    }
  }
  async getBlockInfo(blockNumber: number): Promise<ethers.Block | null> {
    return await this.httpProvider.getBlock(blockNumber);
  }
}
