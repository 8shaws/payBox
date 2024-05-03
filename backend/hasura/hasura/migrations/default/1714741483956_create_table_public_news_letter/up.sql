CREATE TABLE "public"."news_letter" ("email" text NOT NULL, "id" uuid NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id","email") , UNIQUE ("id"), UNIQUE ("email"));COMMENT ON TABLE "public"."news_letter" IS E'info related to news letter subscribers';
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
CREATE TRIGGER "set_public_news_letter_updated_at"
BEFORE UPDATE ON "public"."news_letter"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_news_letter_updated_at" ON "public"."news_letter" 
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
