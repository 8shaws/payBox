import { SolCluster } from "@paybox/common";
import {
  Cluster,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import { Keypair } from "@solana/web3.js";
import { decode } from "bs58";
import { Program } from "@coral-xyz/anchor";
import * as base58 from "bs58";
import {
  TOKEN_PROGRAM_ID,
  MINT_SIZE,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
  createInitializeMintInstruction,
} from "@solana/spl-token";
import { TokenContract, IDL } from "../idl/types/token_contract";
import { PAYBOX_TOKEN_PROGRAM_ID } from "../constants";
import { BN } from "bn.js";

export class SolTokenOps {
  private static instance: SolTokenOps;
  private connection: anchor.web3.Connection;

  private constructor(cluster: Cluster = SolCluster.Devnet) {
    this.connection = new anchor.web3.Connection(
      anchor.web3.clusterApiUrl(cluster),
      "confirmed",
    );
  }

  public static getInstance(cluster: Cluster = SolCluster.Devnet): SolTokenOps {
    if (!this.instance) {
      this.instance = new SolTokenOps(cluster);
    }
    return this.instance;
  }

  private initProgram(privateKey: string) {
    const keyPair = Keypair.fromSecretKey(new Uint8Array(decode(privateKey)));
    let wallet = new anchor.Wallet(keyPair);
    let provider = new anchor.AnchorProvider(this.connection, wallet, {
      preflightCommitment: "confirmed",
    });
    anchor.setProvider(provider);
    const program = new anchor.Program(IDL, PAYBOX_TOKEN_PROGRAM_ID, provider);
    return { provider, program };
  }

  /** Create and Sign a new token */
  async createToken(minterPrivate: string): Promise<{
    mintPub: string;
    mintPrivate: string;
    ata: string;
    txHash: string;
  }> {
    let { provider, program } = this.initProgram(minterPrivate);

    let mint = anchor.web3.Keypair.generate();
    let lamports: number =
      await program.provider.connection.getMinimumBalanceForRentExemption(
        MINT_SIZE,
      );

    let ata = await getAssociatedTokenAddress(
      mint.publicKey,
      provider.wallet.publicKey,
    );

    const mint_tx = new anchor.web3.Transaction().add(
      anchor.web3.SystemProgram.createAccount({
        fromPubkey: provider.wallet.publicKey,
        newAccountPubkey: mint.publicKey,
        space: MINT_SIZE,
        programId: TOKEN_PROGRAM_ID,
        lamports,
      }),
      createInitializeMintInstruction(
        mint.publicKey,
        0,
        provider.wallet.publicKey,
        provider.wallet.publicKey,
      ),
      createAssociatedTokenAccountInstruction(
        provider.wallet.publicKey,
        ata,
        provider.wallet.publicKey,
        mint.publicKey,
      ),
    );
    try {
      const res = await provider.sendAndConfirm(mint_tx, [mint]);
      // console.log(await provider.connection.getParsedAccountInfo(mint.publicKey));

      return Promise.resolve({
        mintPub: mint.publicKey.toString(),
        mintPrivate: base58.encode(mint.secretKey),
        ata: ata.toString(),
        txHash: res,
      });
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }

  /** Mint tokens to an associated token account */
  async mintToken(
    privateKey: string,
    mint: string,
    ata: string,
    tokens: number,
  ): Promise<string> {
    let { program, provider } = this.initProgram(privateKey);

    let mintKP = new anchor.web3.PublicKey(mint);
    let associatedTokenAccount = new anchor.web3.PublicKey(ata);

    try {
      const txn = await program.methods
        .mintToken(new BN(tokens))
        .accounts({
          mint: mintKP,
          tokenProgram: TOKEN_PROGRAM_ID,
          tokenAccount: associatedTokenAccount,
          authority: provider.wallet.publicKey,
        })
        .rpc();

      console.log("Minted: ", txn);

      //verify
      //@ts-ignore
      // const minted = // @ts-ignore
      //   //@ts-ignore
      //   //@ts-ignore
      //   (await provider.connection.getParsedAccountInfo(associatedTokenAccount))
      //     .value.data.parsed.info.tokenAmount.uiAmount;
      // console.log("Minted: ", minted);

      return Promise.resolve(txn);
    } catch (e) {
      console.log("Error: ", e);
      return Promise.reject(e);
    }
  }

  /** Generates an associated token account for a given mint */
  async genAta(mint: string, privateKey: string): Promise<string> {
    const keyPair = Keypair.fromSecretKey(new Uint8Array(decode(privateKey)));
    let mintKP = new anchor.web3.PublicKey(mint);

    const ata = await getAssociatedTokenAddress(mintKP, keyPair.publicKey);

    let tx = new Transaction().add(
      createAssociatedTokenAccountInstruction(
        keyPair.publicKey,
        ata,
        keyPair.publicKey,
        mintKP,
      ),
    );

    try {
      await sendAndConfirmTransaction(this.connection, tx, [keyPair]);
      return Promise.resolve(ata.toString());
    } catch (e) {
      console.log(e);
      return Promise.reject(e);
    }
  }

  /** Transfers token from one Ata to another ata */
  async transferToken(
    privateKey: string,
    fromAta: string,
    toAta: string,
    amount: number,
  ): Promise<string> {
    let { program, provider } = this.initProgram(privateKey);

    let authAtaKP = new anchor.web3.PublicKey(fromAta);
    let toAtaKP = new anchor.web3.PublicKey(toAta);

    try {
      let txn = await program.methods
        .transferToken(new BN(amount))
        .accounts({
          tokenProgram: TOKEN_PROGRAM_ID,
          from: fromAta,
          fromAuthority: provider.wallet.publicKey,
          to: toAta,
        })
        .rpc();
      return Promise.resolve(txn);
    } catch (e) {
      console.log(e);
      return Promise.reject(e);
    }
  }
}
