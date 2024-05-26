comment on column "public"."eth"."rinkebyEth" is E'eth address and token for client wallets';
alter table "public"."eth" alter column "rinkebyEth" set default 0.00;
alter table "public"."eth" alter column "rinkebyEth" drop not null;
alter table "public"."eth" add column "rinkebyEth" float8;
