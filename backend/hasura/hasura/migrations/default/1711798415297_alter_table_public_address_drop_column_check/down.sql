comment on column "public"."address"."check" is E'different chain and there address';
alter table "public"."address" alter column "check" set default version();
alter table "public"."address" alter column "check" drop not null;
alter table "public"."address" add column "check" text;
