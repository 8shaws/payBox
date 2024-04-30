import * as dotenv from "dotenv";
dotenv.config();

export const INDEXER_PORT
    = process.env.INDEXER_PORT || 8088;

export const INDEXER_KAFKA_URL
    = process.env.INDEXER_KAFKA_URL || "localhost:9092";

export const INDEXER_KAFKA_ID
    = process.env.INDEXER_KAFKA_ID || "indexer";

export const SOL_WS_API_KEY
    = process.env.SOL_WS_API_KEY || "";

export const SOL_DEVNET_WS_NODE_URL = `wss://devnet.helius-rpc.com/?api-key=${SOL_WS_API_KEY}`;
export const SOL_MAINNET_WS_NODE_URL = `wss://mainnet.helius-rpc.com/?api-key=${SOL_WS_API_KEY}`;

export const SOL_RPC_DEVENT_NODE_URL
    = `https://devnet.helius-rpc.com/?api-key=${SOL_WS_API_KEY}`;

export const SOL_RPC_MAINNET_NODE_URL
    = `https://mainnet.helius-rpc.com/?api-key=${SOL_WS_API_KEY}`;