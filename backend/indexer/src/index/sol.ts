import { SOL_DEVNET_WS_NODE_URL } from "../config";
import { WebSocket } from "ws";
import { TxnSubValue } from "../types/enum";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { Worker } from "../worker/producer";
import { unixToISOString } from "@paybox/common";

export class SolIndex {
    private static instance: SolIndex;
    private ws: WebSocket;
    private connection: Connection;

    constructor() {
        this.connection = new Connection(clusterApiUrl("devnet"), "confirmed");
        this.ws = new WebSocket(SOL_DEVNET_WS_NODE_URL);

        this.ws.on('open', () => {
            console.log("Connected to Solana websocket");
        });
    }

    public static getInstance(): SolIndex {
        if (!this.instance) {
            this.instance = new SolIndex();
        }
        return this.instance;
    }

    get wsInstance() {
        return this.ws;
    }

    // method to subscribe to account change
    async accSubscribe(address: string, ws: any) {

        if (this.ws.readyState !== WebSocket.OPEN) {
            await new Promise((resolve) => {
                this.ws.on('open', resolve);
            });
        }

        const request = {
            "jsonrpc": "2.0",
            "id": 1,
            "method": "accountSubscribe",
            "params": [
                address,
                {
                    "encoding": "jsonParsed",
                    "commitment": "finalized"
                }
            ]
        }

        this.ws.send(JSON.stringify(request));

        this.ws.on('message', (message) => {
            const data = JSON.parse(message.toString('utf-8'));
            console.log(data);
            ws.send(JSON.stringify(data));
        });

    }

    async logSubcribe(from: string, ws: any) {

        if (this.ws.readyState !== WebSocket.OPEN) {
            await new Promise((resolve) => {
                this.ws.on('open', resolve);
            });
        }

        const request = {
            jsonrpc: "2.0",
            id: 420,
            method: "logsSubscribe",
            params: [
                {
                    mentions: [
                        from
                    ]
                },
                {
                    commitment: "finalized",
                    encoding: "jsonParsed",
                    transactionDetails: "full",
                    showRewards: true,
                    maxSupportedTransactionVersion: 0
                }
            ]
        };

        this.ws.send(JSON.stringify(request));

        this.ws.on('message', (message) => {
            const data = JSON.parse(message.toString('utf-8'));
            console.log(data);
            ws.send(JSON.stringify(data));
        });

    }

    //use this method to subscribe to a signature
    async txnSubscribe(hash: string, ws: any) {

        if (this.ws.readyState !== WebSocket.OPEN) {
            await new Promise((resolve) => {
                this.ws.on('open', resolve);
            });
        }

        const request = {
            "jsonrpc": "2.0",
            "id": 1,
            "method": "signatureSubscribe",
            "params": [
                hash,
                {
                    "commitment": "finalized"
                }
            ]
        }

        this.ws.send(JSON.stringify(request));

        this.ws.on('message', (message) => {
            const data = JSON.parse(message.toString('utf-8'));
            console.log(data);
            //todo: publish this to messaging queue for further processing
            ws.send(JSON.stringify(data));

            // /**
            //  * Publishing the txn payload for que based system
            //  */
            // (async () => {

            //     try {
            //         const transaction = await this.connection.getParsedConfirmedTransaction(hash);
            //         if (!transaction) {
            //             return;
            //         }
                    
            //         await Worker.getInstance().publishOne({
            //             topic: "txn4",
            //             message: [
            //                 {
            //                     partition: 1,
            //                     key: hash,
            //                     value: JSON.stringify({
            //                         hash,
            //                         amount,
            //                         time: unixToISOString(Number(transaction.blockNumber)),
            //                         fee: calculateGas(transaction.gasLimit, transaction.gasPrice),
            //                         id,
            //                         from: transaction.from,
            //                         to: transaction.to,
            //                         blockHash: transaction.blockHash,
            //                         chainId: Number(transaction.chainId),
            //                         slot: Number(transaction.nonce),
            //                         network,
            //                         cluster,
            //                     }),
            //                 },
            //             ],
            //         });
            //     } catch (error) {
            //         console.log('Error in publishing: ', error);
            //     }
            // })()

        });

    }

    async blockSubscribe(address: string, values: TxnSubValue, ws: any) {

        if (this.ws.readyState !== WebSocket.OPEN) {
            await new Promise((resolve) => {
                this.ws.on('open', resolve);
            });
        }

        const request = {
            "jsonrpc": "2.0",
            "id": "1",
            "method": "blockSubscribe",
            "params": [
                {
                    "mentionsAccountOrProgram": address
                },
                {
                    "commitment": "confirmed",
                    "encoding": "jsonParsed",
                    "showRewards": true,
                    "transactionDetails": "full"
                }
            ]
        }

        this.ws.send(JSON.stringify(request));

        this.ws.on('message', (message) => {
            const data = JSON.parse(message.toString('utf-8'));
            console.log(data);
            ws.send(JSON.stringify(data));
        });
    }

    async tokenSubscribe(programId: string, ws: any) {

        if (this.ws.readyState !== WebSocket.OPEN) {
            await new Promise((resolve) => {
                this.ws.on('open', resolve);
            });
        }

        const request = {
            "jsonrpc": "2.0",
            "id": 1,
            "method": "programSubscribe",
            "params": [
                programId,
                {
                    "encoding": "jsonParsed",
                    "commitment": "finalized"
                }
            ]
        }

        this.ws.send(JSON.stringify(request));

        this.ws.on('message', (message) => {
            const data = JSON.parse(message.toString('utf-8'));
            console.log(data);
            ws.send(JSON.stringify(data));
        });
    }

}