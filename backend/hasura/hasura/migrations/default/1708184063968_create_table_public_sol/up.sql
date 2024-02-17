CREATE TABLE "public"."sol" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "devnet" text NOT NULL, "mainnet" text NOT NULL, "testnet" text NOT NULL, "clientId" UUID NOT NULL, "walletId" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("clientId") REFERENCES "public"."client"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("walletId") REFERENCES "public"."wallet"("id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("id"), UNIQUE ("devnet"), UNIQUE ("mainnet"), UNIQUE ("testnet"), UNIQUE ("clientId"), UNIQUE ("walletId"));COMMENT ON TABLE "public"."sol" IS E'solana address for client wallets';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
