alter table "public"."address_book" rename column "publick_ey" to "sol";
ALTER TABLE "public"."address_book" ALTER COLUMN "sol" TYPE ARRAY;
