import * as anchor from '@project-serum/anchor';
import { Keypair, PublicKey, SystemProgram } from '@solana/web3.js';
import { decode } from 'bs58';
import fs from 'fs';
import dotenv from 'dotenv';
import { TOKEN_PROGRAM_ID } from '@project-serum/anchor/dist/cjs/utils/token';
dotenv.config();


const idl = JSON.parse(fs.readFileSync('./target/idl/token_contract.json', 'utf8'));

const programId = new anchor.web3.PublicKey("CnQY56UWDHc6kkeENU7jp4QZEkEpUsE3cJNKRm9Q5qvK");
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
  const fromWallet = anchor.web3.Keypair.generate()
  const mint = anchor.web3.Keypair.generate()
  const tx = await program.methods.initializeMint().accounts({
    mint: mint.publicKey,
    payer: fromWallet.publicKey,
    systemProgram: anchor.web3.SystemProgram.programId,
    tokenProgram: program.programId,
    rent: anchor.web3.SYSVAR_RENT_PUBKEY
  }).signers([fromWallet, mint]).rpc();

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