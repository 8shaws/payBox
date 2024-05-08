import * as anchor from "@project-serum/anchor";
import { Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import { decode } from "bs58";
import fs from "fs";
import dotenv from "dotenv";
import {
  TOKEN_PROGRAM_ID,
  MINT_SIZE,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
  createInitializeMintInstruction,
} from "@solana/spl-token";
import { TokenContract } from "../target/types/token_contract";
import { BN } from "bn.js";
import { Program } from "@coral-xyz/anchor";
dotenv.config();

const idl = JSON.parse(
  fs.readFileSync("./target/idl/token_contract.json", "utf8"),
);

const programId = new anchor.web3.PublicKey(
  "5GYC234ogiyd7JBX8MK9mH7v97BVNnVc5DvL2ytBdvX6",
);
const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);
const program = anchor.workspace.TokenContract as Program<TokenContract>;

async function main() {
  // this is your client wallet public key
  const key = provider.wallet.publicKey;

  // tokens to mint like solana eth etc
  const mint = anchor.web3.Keypair.generate();

  const lamports: number =
    await program.provider.connection.getMinimumBalanceForRentExemption(
      MINT_SIZE,
    );

  // Get the ATA for a token and the account that we want to own the ATA (but it might not existing on the SOL network yet)
  let associatedTokenAccount = await getAssociatedTokenAddress(
    mint.publicKey,
    key,
  );

  // Fires a list of instructions
  const mint_tx = new anchor.web3.Transaction().add(
    // Use anchor to create an account from the mint key that we created
    anchor.web3.SystemProgram.createAccount({
      fromPubkey: key,
      newAccountPubkey: mint.publicKey,
      space: MINT_SIZE,
      programId: TOKEN_PROGRAM_ID,
      lamports,
    }),
    // Fire a transaction to create our mint account that is controlled by our anchor wallet
    createInitializeMintInstruction(mint.publicKey, 0, key, key),
    // Create the ATA account that is associated with our mint on our anchor wallet
    createAssociatedTokenAccountInstruction(
      key,
      associatedTokenAccount,
      key,
      mint.publicKey,
    ),
  );

  // sends and create the transaction
  const res = await provider.sendAndConfirm(mint_tx, [mint]);

  console.log(await provider.connection.getParsedAccountInfo(mint.publicKey));

  console.log("Account: ", res);
  console.log("Mint key: ", mint.publicKey.toString());
  console.log("User: ", key.toString());

  // Executes our code to mint our token into our specified ATA
  const tx = await program.methods
    .mintToken(new BN(1000000))
    .accounts({
      mint: mint.publicKey,
      tokenProgram: TOKEN_PROGRAM_ID,
      tokenAccount: associatedTokenAccount,
      authority: key,
    })
    .rpc();

  console.log("Minted: ", tx);

  // Get minted token amount on the ATA for our anchor wallet
  //@ts-ignore
  const minted = (
    await provider.connection.getParsedAccountInfo(associatedTokenAccount)
  ).value.data.parsed.info.tokenAmount.uiAmount;
  console.log("Minted: ", minted);

  // testing the transfer
  const toWallet: anchor.web3.Keypair = anchor.web3.Keypair.generate();
  // The ATA for a token on the to wallet (but might not exist yet)
  const toATA = await getAssociatedTokenAddress(
    mint.publicKey,
    toWallet.publicKey,
  );
  console.log("To ATA: ", toATA.toString());

  // Fires a list of instructions
  // create the ata if not exist
  const transfer_tx = new anchor.web3.Transaction().add(
    // Create the ATA account that is associated with our To wallet
    createAssociatedTokenAccountInstruction(
      key,
      toATA,
      toWallet.publicKey,
      mint.publicKey,
    ),
  );

  // Sends and create the transaction
  await provider.sendAndConfirm(transfer_tx, []);

  // Executes our transfer smart contract
  await program.methods
    .transferToken(new BN(500000))
    .accounts({
      tokenProgram: TOKEN_PROGRAM_ID,
      from: associatedTokenAccount,
      fromAuthority: key,
      to: toATA,
    })
    .rpc();

  // Get minted token amount on the ATA for our anchor wallet
  //@ts-ignore
  const transferminted = (
    await program.provider.connection.getParsedAccountInfo(
      associatedTokenAccount,
    )
  ).value.data.parsed.info.tokenAmount.amount;
  console.log("Minted: ", transferminted);
}

main().catch(console.error);
