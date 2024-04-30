import { Connection } from "@solana/web3.js";
import { SOL_DEVNET_WS_NODE_URL, SOL_RPC_DEVENT_NODE_URL } from "../config";
import { WebSocket } from "ws";

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

}