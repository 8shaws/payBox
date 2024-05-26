comment on column "public"."sol"."devnetSol" is E'solana address for client wallets';
alter table "public"."sol" alter column "devnetSol" set default '0'::double precision;
alter table "public"."sol" alter column "devnetSol" drop not null;
alter table "public"."sol" add column "devnetSol" float8;
