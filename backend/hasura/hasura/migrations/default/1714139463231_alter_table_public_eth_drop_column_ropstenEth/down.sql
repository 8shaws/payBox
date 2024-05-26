comment on column "public"."eth"."ropstenEth" is E'eth address and token for client wallets';
alter table "public"."eth" alter column "ropstenEth" set default 0.00;
alter table "public"."eth" alter column "ropstenEth" drop not null;
alter table "public"."eth" add column "ropstenEth" float8;
