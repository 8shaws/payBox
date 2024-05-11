CREATE TABLE "public"."token_txn" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "blockHash" text NOT NULL, "fee" float8 NOT NULL, "hash" text NOT NULL, "amount" float8 NOT NULL, "fromAta" text NOT NULL, "toAta" text NOT NULL, "isMint" boolean NOT NULL DEFAULT false, "token" text NOT NULL, "network" text NOT NULL, "slot" int8 NOT NULL, "status" text NOT NULL DEFAULT 'pending', "time" time NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "clientId" uuid NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("clientId") REFERENCES "public"."client"("id") ON UPDATE no action ON DELETE no action, FOREIGN KEY ("token") REFERENCES "public"."token"("pubKey") ON UPDATE no action ON DELETE no action, FOREIGN KEY ("fromAta") REFERENCES "public"."ata"("pubKey") ON UPDATE no action ON DELETE no action, FOREIGN KEY ("toAta") REFERENCES "public"."ata"("pubKey") ON UPDATE no action ON DELETE no action, UNIQUE ("id"));COMMENT ON TABLE "public"."token_txn" IS E'all the token transactions';
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_token_txn_updated_at"
BEFORE UPDATE ON "public"."token_txn"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_token_txn_updated_at" ON "public"."token_txn" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
