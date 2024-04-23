comment on column "public"."eth"."network" is E'eth address and token for client wallets';
alter table "public"."eth" alter column "network" set default ''sepolia'::text';
alter table "public"."eth" alter column "network" drop not null;
alter table "public"."eth" add column "network" text;
