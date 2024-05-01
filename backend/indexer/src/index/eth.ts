import { WebSocket } from "ws";
import { ETH_WS_SEPOLIA_URL } from "../config";

export class EthIndex {
    private ws: WebSocket;
    private static instance: EthIndex;

    constructor() {
        this.ws = new WebSocket(ETH_WS_SEPOLIA_URL);

        this.ws.on('open', () => {
            console.log("Connected to Ethereum websocket");
        });
    }

    public static getInstance(): EthIndex {
        if (!this.instance) {
            this.instance = new EthIndex();
        }
        return this.instance;
    }

    get wsInstance() {
        return this.ws;
    }

    async log(address: string, topics: string[], ws: any) {

        if (this.ws.readyState !== WebSocket.OPEN) {
            await new Promise((resolve) => {
                this.ws.on('open', resolve);
            });
        }

        const request = {
            "jsonrpc": "2.0",
            "id": 1,
            "method": "eth_subscribe",
            "params": [
                "logs",
                {
                    "address": address,
                    "topics": topics
                }]
        };

        this.ws.send(JSON.stringify(request));

        this.ws.on('message', (message) => {
            const data = JSON.parse(message.toString('utf-8'));
            console.log(data);
            ws.send(JSON.stringify(data));
        });
    }

    async txnSubcribe(hash: string, ws: any) {
            
            if (this.ws.readyState !== WebSocket.OPEN) {
                await new Promise((resolve) => {
                    this.ws.on('open', resolve);
                });
            }
    
            const request = {
                "jsonrpc": "2.0",
                "id": 1,
                "method": "eth_subscribe",
                "params": [
                    "newPendingTransactions"
                ]
            };
    
            this.ws.send(JSON.stringify(request));
    
            this.ws.on('message', (message) => {
                const data = JSON.parse(message.toString('utf-8'));
                console.log(data);
                ws.send(JSON.stringify(data));
            });
    }

}