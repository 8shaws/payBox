comment on column "public"."token_txn"."time" is E'all the token transactions';
alter table "public"."token_txn" alter column "time" drop not null;
alter table "public"."token_txn" add column "time" timetz;
