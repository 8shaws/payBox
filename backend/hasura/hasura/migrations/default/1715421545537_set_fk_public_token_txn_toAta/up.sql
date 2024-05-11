alter table "public"."token_txn"
  add constraint "token_txn_toAta_fkey"
  foreign key ("toAta")
  references "public"."ata"
  ("pubKey") on update no action on delete no action;
