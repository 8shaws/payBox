alter table "public"."address_book" add column "created_at" timestamptz
 not null default now();
