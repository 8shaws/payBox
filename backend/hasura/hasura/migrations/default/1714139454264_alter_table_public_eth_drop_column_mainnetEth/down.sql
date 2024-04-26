comment on column "public"."eth"."mainnetEth" is E'eth address and token for client wallets';
alter table "public"."eth" alter column "mainnetEth" set default 0.00;
alter table "public"."eth" alter column "mainnetEth" drop not null;
alter table "public"."eth" add column "mainnetEth" float8;
