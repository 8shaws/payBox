import * as bitcoin from "bitcoinjs-lib";
import ECPairFactory from 'ecpair';
import ecc from '@bitcoinerlab/secp256k1';
import { regtestUtils } from "./_regtestUtils";
import { BitcoinCluster, WalletKeys } from "@paybox/common";
import { createPayment, getInputData } from "./utils";

const ECPair = ECPairFactory(ecc);
const dhttp = regtestUtils.dhttp;

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

        const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey })

        if (!address) {
            throw new Error('Error generating address');
        }

        // const result = await dhttp({
        //     method: 'GET',
        //     url: 'https://blockchain.info/rawaddr/' + address,
        // });

        return { privateKey, publicKey: address };
    }

    async signTxn(
        senderPrivate: string,
        receiverPubKey: string,
        amount: number,
        network: bitcoin.networks.Network,
        isSegwit: boolean = false,
    ) {
        const senderKeyPair = ECPair.fromWIF(senderPrivate);

        const p2wsh = createPayment('p2wsh-p2pk', [senderKeyPair]);
        const inputData = await getInputData(amount, p2wsh.payment, isSegwit, 'p2wsh');
        const psbt = new bitcoin.Psbt({ network })
            .addInput(inputData)
            .addOutput({
                address: receiverPubKey,
                value: amount - 1000,
            })
            .signInput(0, p2wsh.keys[0]);
        psbt.finalizeAllInputs();


        //broadcast the transaction
        const tx = psbt.extractTransaction();
        await regtestUtils.broadcast(tx.toHex());

        // await regtestUtils.verify({
        //     txId: tx.getId(),
        //     address: receiverPubKey,
        //     vout: inputData.index,
        //     value: amount - 1000,
        // });

        return tx.getId();
    }


}