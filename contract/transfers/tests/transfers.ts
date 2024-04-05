import * as anchor from '@project-serum/anchor';
import { Keypair, SystemProgram } from '@solana/web3.js';
import { decode } from 'bs58';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();


const idl = JSON.parse(fs.readFileSync('./target/idl/paybox_txn.json', 'utf8'));

const programId = new anchor.web3.PublicKey(process.env.PROGRAM_ID as string);
const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);

const program = new anchor.Program(idl, programId, provider);
const secretKey = new Uint8Array([70, 121, 207, 138, 198, 193, 135, 158, 87, 4, 134, 81, 28, 64, 220, 152, 164, 102, 10, 74, 16, 132, 196, 146, 92, 104, 38, 193, 179, 127, 190, 252, 224, 217, 254, 224, 146, 207, 210, 224, 84, 53, 124, 87, 214, 144, 0, 211, 234, 243, 202, 32, 197, 46, 128, 202, 89, 251, 71, 34, 254, 8, 250, 186]);
const from = Keypair.fromSecretKey(secretKey);


async function main() {

  const client = anchor.web3.Keypair.generate();
  // await provider.connection.requestAirdrop(client.publicKey, 10000000);
  const tx = await program.methods
    .addAccount(programId)
    .accounts({
      client: client.publicKey,
      signer: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
    })
    .signers([client])
    .rpc();

  console.log('Transaction', tx)
  await provider.connection.confirmTransaction(tx, 'processed');
  console.log('Success', tx)
  // const account = await program.account.client.fetch(client.publicKey);
  // console.log('Account', account);
  
  const getLenTx = await program.methods
  .getLength()
  .accounts({
    client: client.publicKey
  })
  .rpc();
  
  await provider.connection.confirmTransaction(getLenTx, 'processed');
  console.log('Transaction', getLenTx)
}

main().catch(console.error);