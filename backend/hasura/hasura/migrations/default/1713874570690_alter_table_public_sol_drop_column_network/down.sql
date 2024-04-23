comment on column "public"."sol"."network" is E'solana address for client wallets';
alter table "public"."sol" alter column "network" set default ''devnet'::text';
alter table "public"."sol" alter column "network" drop not null;
alter table "public"."sol" add column "network" text;
