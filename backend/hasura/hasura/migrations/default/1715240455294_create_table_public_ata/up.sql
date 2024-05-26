CREATE TABLE "public"."ata" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "pubKey" text NOT NULL, "privateKey" text NOT NULL, "owner" text NOT NULL, "token" text NOT NULL, "is_minter" boolean NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , FOREIGN KEY ("token") REFERENCES "public"."tokens"("pubKey") ON UPDATE no action ON DELETE no action, UNIQUE ("id"), UNIQUE ("pubKey"), UNIQUE ("privateKey"));COMMENT ON TABLE "public"."ata" IS E'associated token account';
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
CREATE TRIGGER "set_public_ata_updated_at"
BEFORE UPDATE ON "public"."ata"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_ata_updated_at" ON "public"."ata" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
