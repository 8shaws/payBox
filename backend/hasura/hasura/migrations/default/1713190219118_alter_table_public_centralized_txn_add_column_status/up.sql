alter table "public"."centralized_txn" add column "status" text
 not null default 'intiated';
