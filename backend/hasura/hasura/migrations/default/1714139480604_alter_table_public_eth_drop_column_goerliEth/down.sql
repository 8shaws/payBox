comment on column "public"."eth"."goerliEth" is E'eth address and token for client wallets';
alter table "public"."eth" alter column "goerliEth" set default 0.00;
alter table "public"."eth" alter column "goerliEth" drop not null;
alter table "public"."eth" add column "goerliEth" float8;
