import { SolCluster } from "@paybox/common";
import { Cluster } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import { Keypair } from "@solana/web3.js";
import { decode } from "bs58";
import { Program } from "@coral-xyz/anchor";
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

  async createToken(minterPrivate: string): Promise<{
    mint: string;
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
        mint: mint.publicKey.toString(),
        ata: ata.toString(),
        txHash: res,
      });
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }

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
}
