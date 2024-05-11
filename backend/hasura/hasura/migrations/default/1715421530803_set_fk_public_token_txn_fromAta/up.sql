alter table "public"."token_txn"
  add constraint "token_txn_fromAta_fkey"
  foreign key ("fromAta")
  references "public"."ata"
  ("pubKey") on update no action on delete no action;
