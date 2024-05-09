CREATE TABLE "public"."mint_tokens" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "pubKey" text NOT NULL, "privateKey" text NOT NULL, "name" text NOT NULL, "authority" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , UNIQUE ("id"), UNIQUE ("privateKey"), UNIQUE ("authority"));COMMENT ON TABLE "public"."mint_tokens" IS E'table storing all the mint token infos';
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
CREATE TRIGGER "set_public_mint_tokens_updated_at"
BEFORE UPDATE ON "public"."mint_tokens"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_mint_tokens_updated_at" ON "public"."mint_tokens" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
