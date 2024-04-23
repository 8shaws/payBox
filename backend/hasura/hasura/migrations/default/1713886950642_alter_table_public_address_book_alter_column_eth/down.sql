alter table "public"."address_book" rename column "name" to "eth";
ALTER TABLE "public"."address_book" ALTER COLUMN "eth" TYPE ARRAY;
