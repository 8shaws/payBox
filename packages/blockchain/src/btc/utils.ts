import ECPairFactory from "ecpair";
import { regtestUtils } from "./_regtestUtils";
import BIP32Factory from "bip32";
import ecc from "@bitcoinerlab/secp256k1";
import * as bitcoin from "bitcoinjs-lib";
import rng from "randombytes";

const ECPair = ECPairFactory(ecc);
const regtest = regtestUtils.network;
const bip32 = BIP32Factory(ecc);

export function createPayment(
  _type: string,
  myKeys?: any[],
  network?: any,
): any {
  network = network || regtest;
  const splitType = _type.split("-").reverse();
  const isMultisig = splitType[0].slice(0, 4) === "p2ms";
  const keys = myKeys || [];
  let m: number | undefined;

  if (isMultisig) {
    const match = splitType[0].match(/^p2ms\((\d+) of (\d+)\)$/);
    m = parseInt(match![1], 10);
    let n = parseInt(match![2], 10);
    if (keys.length > 0 && keys.length !== n) {
      throw new Error("Need n keys for multisig");
    }
    while (!myKeys && n > 1) {
      keys.push(ECPair.makeRandom({ network }));
      n--;
    }
  }
  if (!myKeys) keys.push(ECPair.makeRandom({ network }));

  let payment: any;
  splitType.forEach((type) => {
    if (type.slice(0, 4) === "p2ms") {
      payment = bitcoin.payments.p2ms({
        m,
        pubkeys: keys.map((key) => key.publicKey).sort((a, b) => a.compare(b)),
        network,
      });
    } else if (["p2sh", "p2wsh"].indexOf(type) > -1) {
      payment = (bitcoin.payments as any)[type]({
        redeem: payment,
        network,
      });
    } else {
      payment = (bitcoin.payments as any)[type]({
        pubkey: keys[0].publicKey,
        network,
      });
    }
  });

  return {
    payment,
    keys,
  };
}

export function getWitnessUtxo(out: any): any {
  delete out.address;
  out.script = Buffer.from(out.script, "hex");
  return out;
}

export async function getInputData(
  amount: number,
  payment: any,
  isSegwit: boolean,
  redeemType: string,
): Promise<any> {
  const unspent = await regtestUtils.faucetComplex(payment.output, amount);
  const utx = await regtestUtils.fetch(unspent.txId);
  // for non segwit inputs, you must pass the full transaction buffer
  const nonWitnessUtxo = Buffer.from(utx.txHex, "hex");
  // for segwit inputs, you only need the output script and value as an object.
  const witnessUtxo = getWitnessUtxo(utx.outs[unspent.vout]);
  const mixin = isSegwit ? { witnessUtxo } : { nonWitnessUtxo };
  const mixin2: any = {};
  switch (redeemType) {
    case "p2sh":
      mixin2.redeemScript = payment.redeem.output;
      break;
    case "p2wsh":
      mixin2.witnessScript = payment.redeem.output;
      break;
    case "p2sh-p2wsh":
      mixin2.witnessScript = payment.redeem.redeem.output;
      mixin2.redeemScript = payment.redeem.output;
      break;
  }
  return {
    hash: unspent.txId,
    index: unspent.vout,
    ...mixin,
    ...mixin2,
  };
}
