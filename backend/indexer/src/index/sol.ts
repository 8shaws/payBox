import { SOL_DEVNET_WS_NODE_URL } from "../config";
import { WebSocket } from "ws";
import { TxnSubValue } from "../types/enum";

export class SolIndex {
    private static instance: SolIndex;
    private ws: WebSocket;

    constructor() {
        this.ws = new WebSocket(SOL_DEVNET_WS_NODE_URL);
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

    async logSubcribe(from: string, to: string, ws: any) {

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
            ws.send(JSON.stringify(data));
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

}