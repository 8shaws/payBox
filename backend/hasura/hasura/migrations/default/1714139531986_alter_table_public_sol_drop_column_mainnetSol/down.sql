comment on column "public"."sol"."mainnetSol" is E'solana address for client wallets';
alter table "public"."sol" alter column "mainnetSol" set default '0'::double precision;
alter table "public"."sol" alter column "mainnetSol" drop not null;
alter table "public"."sol" add column "mainnetSol" float8;
