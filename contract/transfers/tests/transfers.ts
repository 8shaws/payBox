import * as anchor from '@project-serum/anchor';
import { Keypair, PublicKey, SystemProgram } from '@solana/web3.js';
import { decode } from 'bs58';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();


const idl = JSON.parse(fs.readFileSync('./target/idl/paybox.json', 'utf8'));

const programId = new anchor.web3.PublicKey("UdwTHQ9ag5Cvjo1ZMPg3zqTeX1aodFAtVzrnwFGZYhb");
const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);
// const program = anchor.workspace.PayboxTxn,
const program = new anchor.Program(idl, programId, provider);


async function main() {
  // let seed = anchor.utils.bytes.utf8.encode(`paybox`);
  let to = Keypair.fromSecretKey(new Uint8Array(decode(process.env.TO!)));
  let from = Keypair.fromSecretKey(new Uint8Array(decode(process.env.FROM!)));
  // let clientSeed = Buffer.concat([
  //   Buffer.from("account"),
  //   demoKeyPair.publicKey.toBuffer().subarray(0, 24),
  // ])
  // let [clientAddress, clientBump] = await anchor.web3.PublicKey.findProgramAddress(
  //   [clientSeed],
  //   program.programId
  // );
  // await provider.connection.requestAirdrop(from.publicKey, 10000000);
  const tx = await program.methods
    .transferLamports(new anchor.BN(1000000))
    .accounts({
      from: from.publicKey,
      to: to.publicKey,
      systemProgram: SystemProgram.programId,
    })
    .signers([from])
    .rpc();

  console.log('Transaction', tx)
  await provider.connection.confirmTransaction(tx, 'processed');
  console.log('Success', tx)
  // const account = await program.account.client.fetch(clientPubkey);
  // console.log('Account', account);
  // const getLenTx = await program.methods
  //   .getLength()
  //   .accounts({
  //     client: clientAddress,
  //     authority: provider.wallet.publicKey,
  //   })
  //   .rpc();

  // await provider.connection.confirmTransaction(getLenTx, 'processed');
  // console.log('Transaction', getLenTx)
}

main().catch(console.error);