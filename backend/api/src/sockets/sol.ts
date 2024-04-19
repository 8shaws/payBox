import {
    Cluster,
    Connection,
    Keypair,
    LAMPORTS_PER_SOL,
    PublicKey,
    Signer,
    SystemProgram,
    Transaction,
    TransactionResponse,
    clusterApiUrl,
    sendAndConfirmTransaction,
  } from "@solana/web3.js";
  import {
    AcceptSolTxn,
    ChainAccount,
    ChainAccountPrivate,
    Network,
    SolChainId,
    WalletKeys,
  } from "@paybox/common";
  import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
  import baseX from "base-x";
  import * as base58 from "bs58";
  
  import * as bip39 from "bip39";
  import { ec as EC } from "elliptic";
  import bs58 from "bs58";
  import * as bip32 from "bip32";
  import { derivePath } from "ed25519-hd-key";
import { encryptWithPassword } from "../auth";

export class SolOps {
    private connection: Connection;
    private rpcUrl: string;

    constructor(net: Cluster = "devnet") {
      this.rpcUrl = clusterApiUrl(net);
      this.connection = new Connection(this.rpcUrl, "confirmed");
    }
  
    async createWallet(secretPhrase: string, hashPassword: string): Promise<WalletKeys> {
      const seedBuffer = await bip39.mnemonicToSeed(secretPhrase);
      const seedKeyArray = Uint8Array.from(seedBuffer.subarray(0, 32));
      const keyPair = Keypair.fromSeed(seedKeyArray);

      return {
        publicKey: keyPair.publicKey.toBase58(),
        privateKey: encryptWithPassword(base58.encode(keyPair.secretKey), hashPassword),
      };
    }
  
    async createAccount(secretPhrase: string, hashPassword: string): Promise<WalletKeys> {
      const accountIndex = Math.round(Date.now() / 1000);
      const path = `m/44'/501'/${accountIndex}'/0'`;
      const derivedSeed = derivePath(path, secretPhrase).key;
      const keyPair = Keypair.fromSeed(derivedSeed);
      console.log('from back', base58.encode(keyPair.secretKey));
      return {
        publicKey: keyPair.publicKey.toBase58(),
        privateKey: encryptWithPassword(base58.encode(keyPair.secretKey), hashPassword),
      };
    }
  
    async fromPhrase(
      mnemonic: string,
      count: number = 1,
    ): Promise<ChainAccountPrivate[]> {
      const accounts: ChainAccountPrivate[] = [];
      for (let i = 0; i < count; i++) {
        const derivedSeed = derivePath(`m/44'/501'/${i}'/0'`, mnemonic).key;
        const keyPair = Keypair.fromSeed(derivedSeed);
        accounts.push({
          chain: {
            chainId: SolChainId.Mainnet,
            name: "Solana",
            network: Network.Sol,
          },
          publicKey: keyPair.publicKey.toBase58(),
          privateKey: base58.encode(keyPair.secretKey),
        });
      }
      return accounts;
    }
  
    async fromSecret(secretKey: string, hashPassword: string): Promise<WalletKeys> {
      const decodedBytes = bs58.decode(secretKey);
      console.log(decodedBytes);
      const privateKeyArray = new Uint8Array(decodedBytes);
      console.log(privateKeyArray);
      const keyPair = Keypair.fromSecretKey(decodedBytes);
      return {
        publicKey: keyPair.publicKey.toBase58(),
        privateKey: encryptWithPassword(base58.encode(keyPair.secretKey), hashPassword),
      };
    }
  
    isValidSecretKey(secretKey: string): boolean {
      try {
        const key = Buffer.from(secretKey, "hex");
        if (key.length !== 64) {
          return false;
        }
        return true;
      } catch {
        return false;
      }
    }

    async checkAddress(address: string): Promise<boolean> {
      const isAccount = await this.connection.getAccountInfo(
        new PublicKey(address),
      );
      if (isAccount) {
        return true;
      }
      return false;
    }
    //todo: use the contract
    async acceptTxn({
      from,
      to,
      amount,
    }: AcceptSolTxn): Promise<TransactionResponse | null> {
      try {
        const senderKey = Keypair.fromSecretKey(new PublicKey(from).toBuffer());
        /**
         * Do some airdrop for new keypair generated
         */
        // const airdropSignature = await this.connection.requestAirdrop(
        //     senderKey.publicKey,
        //     LAMPORTS_PER_SOL
        // );
        const { blockhash } = await this.connection.getRecentBlockhash();
  
        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: senderKey.publicKey,
            toPubkey: new PublicKey(to),
            lamports: amount * 10 ** 9, // Convert amount to lamports
          }),
        );
  
        transaction.recentBlockhash = blockhash;
  
        const signature = await sendAndConfirmTransaction(
          this.connection,
          transaction,
          [senderKey],
        );
        const status = await this.connection.getSignatureStatuses([signature]);
        if (status.value[0]?.confirmationStatus == "confirmed") {
          console.log(`Transaction confirmed with signature: ${signature}`);
          const txn = await this.connection.getTransaction(signature);
          return txn;
        }
        return null;
      } catch (error) {
        console.log(error);
        return null;
      }
    }
  }
  