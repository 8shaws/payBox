alter table "public"."address_book" rename column "chain" to "btc";
ALTER TABLE "public"."address_book" ALTER COLUMN "btc" TYPE ARRAY;
