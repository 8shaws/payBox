CREATE TABLE "public"."centralized_txn" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "client_id" UUID NOT NULL, "account_id" uuid NOT NULL, "provider" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , FOREIGN KEY ("client_id") REFERENCES "public"."client"("id") ON UPDATE no action ON DELETE no action, FOREIGN KEY ("account_id") REFERENCES "public"."account"("id") ON UPDATE no action ON DELETE no action, UNIQUE ("id"));COMMENT ON TABLE "public"."centralized_txn" IS E'list off all the centralized transactions';
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
CREATE TRIGGER "set_public_centralized_txn_updated_at"
BEFORE UPDATE ON "public"."centralized_txn"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_centralized_txn_updated_at" ON "public"."centralized_txn" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
