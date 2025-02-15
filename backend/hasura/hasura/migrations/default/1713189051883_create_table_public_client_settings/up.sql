CREATE TABLE "public"."client_settings" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "client_id" uuid NOT NULL, "testmode" boolean NOT NULL DEFAULT true, "lang" text NOT NULL DEFAULT 'en', "prefered_wallet" text NOT NULL DEFAULT 'paybox', "prefered_explorer" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , FOREIGN KEY ("client_id") REFERENCES "public"."client"("id") ON UPDATE no action ON DELETE no action, UNIQUE ("id"), UNIQUE ("client_id"));COMMENT ON TABLE "public"."client_settings" IS E'settings for client';
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
CREATE TRIGGER "set_public_client_settings_updated_at"
BEFORE UPDATE ON "public"."client_settings"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_client_settings_updated_at" ON "public"."client_settings" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
