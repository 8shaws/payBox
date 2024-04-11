alter table "public"."account" drop constraint "account_walletId_fkey",
  add constraint "account_wallet_id_fkey"
  foreign key ("wallet_id")
  references "public"."wallet"
  ("id") on update restrict on delete no action;
