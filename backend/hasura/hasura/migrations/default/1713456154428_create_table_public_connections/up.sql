CREATE TABLE "public"."connections" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "client_id" uuid NOT NULL, "sol_network" text NOT NULL DEFAULT 'devnet', "eth_network" text NOT NULL DEFAULT 'sepolia', "btc_network" text NOT NULL, "client_settings_id" uuid NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , FOREIGN KEY ("client_id") REFERENCES "public"."client"("id") ON UPDATE no action ON DELETE no action, FOREIGN KEY ("client_settings_id") REFERENCES "public"."client_settings"("id") ON UPDATE no action ON DELETE no action, UNIQUE ("id"), UNIQUE ("client_settings_id"), UNIQUE ("client_id"));COMMENT ON TABLE "public"."connections" IS E'blockchains connections metadata';
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
CREATE TRIGGER "set_public_connections_updated_at"
BEFORE UPDATE ON "public"."connections"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_connections_updated_at" ON "public"."connections" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
