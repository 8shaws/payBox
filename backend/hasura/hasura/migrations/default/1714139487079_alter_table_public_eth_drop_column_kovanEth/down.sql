comment on column "public"."eth"."kovanEth" is E'eth address and token for client wallets';
alter table "public"."eth" alter column "kovanEth" set default 0.00;
alter table "public"."eth" alter column "kovanEth" drop not null;
alter table "public"."eth" add column "kovanEth" float8;
