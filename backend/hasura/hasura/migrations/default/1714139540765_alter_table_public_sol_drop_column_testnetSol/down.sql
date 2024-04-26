comment on column "public"."sol"."testnetSol" is E'solana address for client wallets';
alter table "public"."sol" alter column "testnetSol" set default '0'::double precision;
alter table "public"."sol" alter column "testnetSol" drop not null;
alter table "public"."sol" add column "testnetSol" float8;
