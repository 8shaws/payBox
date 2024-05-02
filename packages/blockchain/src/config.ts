import * as dotenv from "dotenv";
dotenv.config();

export const SOL_WS_API_KEY
    = process.env.SOL_WS_API_KEY || "";

export const SOL_RPC_DEVENT_NODE_URL
    = `https://devnet.helius-rpc.com/?api-key=${SOL_WS_API_KEY}`;

export const SOL_RPC_MAINNET_NODE_URL
    = `https://mainnet.helius-rpc.com/?api-key=${SOL_WS_API_KEY}`;

export const ETH_NODE_API_KEY
    = process.env.ETH_NODE_API_KEY || "";

export const ETH_WS_SEPOLIA_URL
    = `wss://sepolia.infura.io/ws/v3/${ETH_NODE_API_KEY}`;

export const ETH_RPC_MAINNET_NODE_URL
    = `https://mainnet.infura.io/v3/${ETH_NODE_API_KEY}`;

export const ETH_RPC_SEPOLIA_NODE_URL
    = `https://sepolia.infura.io/v3/${SOL_WS_API_KEY}`;