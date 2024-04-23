ALTER TABLE "public"."address_book" ALTER COLUMN "btc" TYPE text;
alter table "public"."address_book" rename column "btc" to "chain";
