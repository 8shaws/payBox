import * as anchor from '@project-serum/anchor';
import { Keypair, PublicKey, SystemProgram } from '@solana/web3.js';
import { decode } from 'bs58';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();


const idl = JSON.parse(fs.readFileSync('./target/idl/paybox_txn.json', 'utf8'));

const programId = new anchor.web3.PublicKey(process.env.PROGRAM_ID as string);
const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);
// const program = anchor.workspace.PayboxTxn,
const program = new anchor.Program(idl, programId, provider);


async function main() {
  // let seed = anchor.utils.bytes.utf8.encode(`paybox`);
  let clientSeed = anchor.utils.bytes.utf8.encode(`account`);
  let clientPubkey: PublicKey;
  [clientPubkey] = anchor.web3.PublicKey.findProgramAddressSync(
    [clientSeed],
    program.programId
  );
  // await provider.connection.requestAirdrop(client.publicKey, 10000000);
  const tx = await program.methods
    .addAccount(programId)
    .accounts({
      client: clientPubkey,
      authority: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
    })
    .rpc();

  console.log('Transaction', tx)
  await provider.connection.confirmTransaction(tx, 'processed');
  console.log('Success', tx)
  // const account = await program.account.client.fetch(clientPubkey);
  // console.log('Account', account);
  const getLenTx = await program.methods
    .getLength()
    .accounts({
      client: clientPubkey,
      authority: provider.wallet.publicKey,
    })
    .rpc();

  await provider.connection.confirmTransaction(getLenTx, 'processed');
  console.log('Transaction', getLenTx)
}

main().catch(console.error);