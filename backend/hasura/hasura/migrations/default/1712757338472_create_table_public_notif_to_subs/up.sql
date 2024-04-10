CREATE TABLE "public"."notif_to_subs" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "notification_id" uuid NOT NULL, "notification_subs" uuid NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , FOREIGN KEY ("notification_id") REFERENCES "public"."notification"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("notification_subs") REFERENCES "public"."notification_subscription"("id") ON UPDATE restrict ON DELETE restrict, UNIQUE ("id"));COMMENT ON TABLE "public"."notif_to_subs" IS E'join between noitfication subs and notifcation ';
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
CREATE TRIGGER "set_public_notif_to_subs_updated_at"
BEFORE UPDATE ON "public"."notif_to_subs"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_notif_to_subs_updated_at" ON "public"."notif_to_subs" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
