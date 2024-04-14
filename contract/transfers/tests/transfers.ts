import * as anchor from '@project-serum/anchor';
import { Keypair, PublicKey, SystemProgram } from '@solana/web3.js';
import { decode } from 'bs58';
import fs from 'fs';
import dotenv from 'dotenv';
import {
  TOKEN_PROGRAM_ID,
  MINT_SIZE,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
  createInitializeMintInstruction,
} from "@solana/spl-token";
import { TokenContract } from '../target/types/token_contract';
import { BN } from 'bn.js';
dotenv.config();


const idl = JSON.parse(fs.readFileSync('./target/idl/token_contract.json', 'utf8'));

const programId = new anchor.web3.PublicKey("2q1PSEpwKHp2SM6wUnEceV8jaLLpmGMxK3mnoRmduX9i");
const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);
const program = new anchor.Program(idl as anchor.Idl, programId, provider);

async function main() {

  // this is your client wallet public key
  const key = provider.wallet.publicKey;

  // tokens to mint like solana eth etc
  const mint = anchor.web3.Keypair.generate();

  const lamports: number = await program.provider.connection.getMinimumBalanceForRentExemption(
    MINT_SIZE
  );

  // Get the ATA for a token and the account that we want to own the ATA (but it might not existing on the SOL network yet)
  let associatedTokenAccount = await getAssociatedTokenAddress(
    mint.publicKey,
    key
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
    createInitializeMintInstruction(
      mint.publicKey, 0, key, key
    ),
    // Create the ATA account that is associated with our mint on our anchor wallet
    createAssociatedTokenAccountInstruction(
      key, associatedTokenAccount, key, mint.publicKey
    )
  );

  // sends and create the transaction
  const res = await provider.sendAndConfirm(mint_tx, [mint]);

  console.log(
    await program.provider.connection.getParsedAccountInfo(mint.publicKey)
  );

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
    }).rpc();

  console.log("Minted: ", tx);

  // Get minted token amount on the ATA for our anchor wallet
  //@ts-ignore
  const minted = (await program.provider.connection.getParsedAccountInfo(associatedTokenAccount)).value.data.parsed.info.tokenAmount.uiAmount;
  console.log("Minted: ", minted);
}

main().catch(console.error);