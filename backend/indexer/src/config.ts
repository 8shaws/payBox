import * as dotenv from "dotenv";
dotenv.config();

export const INDEXER_PORT
    = process.env.INDEXER_PORT || 8088;

export const INDEXER_KAFKA_URL
    = process.env.INDEXER_KAFKA_URL || "localhost:9092";

export const INDEXER_KAFKA_ID
    = process.env.INDEXER_KAFKA_ID || "indexer";
