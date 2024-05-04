CREATE TABLE "public"."analyze" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "walletId" uuid NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id","walletId") , FOREIGN KEY ("walletId") REFERENCES "public"."wallet"("id") ON UPDATE no action ON DELETE no action, UNIQUE ("id"), UNIQUE ("walletId"));COMMENT ON TABLE "public"."analyze" IS E'table containing info related to wallet ';
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
CREATE TRIGGER "set_public_analyze_updated_at"
BEFORE UPDATE ON "public"."analyze"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_analyze_updated_at" ON "public"."analyze" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
