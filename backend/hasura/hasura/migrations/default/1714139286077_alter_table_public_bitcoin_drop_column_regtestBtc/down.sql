comment on column "public"."bitcoin"."regtestBtc" is E'bticoin address for client wallets';
alter table "public"."bitcoin" alter column "regtestBtc" set default 0.00;
alter table "public"."bitcoin" alter column "regtestBtc" drop not null;
alter table "public"."bitcoin" add column "regtestBtc" float8;
