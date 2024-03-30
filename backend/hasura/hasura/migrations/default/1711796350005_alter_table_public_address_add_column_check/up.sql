alter table "public"."address" add column "check" text
 not null default version();
