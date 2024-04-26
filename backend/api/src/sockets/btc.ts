import * as bitcoin from "bitcoinjs-lib";
import ECPairFactory from 'ecpair';
import * as ecc from 'tiny-secp256k1';
import { BitcoinCluster, WalletKeys } from "@paybox/common";

const ECPair = ECPairFactory(ecc);
// const dhttp = regtestUtils.dhttp;

export class Bitcoin {
    private static instance: Bitcoin;
    constructor() {

    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new Bitcoin();
        }
        return this.instance;
    }

    async genRand(): Promise<WalletKeys> {
        const keyPair = ECPair.makeRandom();
        const privateKey: string = keyPair.toWIF()

        const { address } = bitcoin.payments.p2sh({
            redeem: bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey }),
        });

        if(!address) {
            throw new Error('Error generating address');
        }
        console.log(address);
        
        // const result = await dhttp({
        //     method: 'GET',
        //     url: 'https://blockchain.info/rawaddr/' + address,
        // });

        // console.log(result);
        return { privateKey, publicKey: address };
    }

}