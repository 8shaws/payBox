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
        if(!this.instance) {
            this.instance = new EthIndex();
        }
        return this.instance;
    }

    get wsInstance() {
        return this.ws;
    }
}