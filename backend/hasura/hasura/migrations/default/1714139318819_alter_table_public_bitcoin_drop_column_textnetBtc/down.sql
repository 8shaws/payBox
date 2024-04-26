comment on column "public"."bitcoin"."textnetBtc" is E'bticoin address for client wallets';
alter table "public"."bitcoin" alter column "textnetBtc" set default 0.00;
alter table "public"."bitcoin" alter column "textnetBtc" drop not null;
alter table "public"."bitcoin" add column "textnetBtc" float8;
