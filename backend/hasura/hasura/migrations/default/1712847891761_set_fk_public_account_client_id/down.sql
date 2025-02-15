alter table "public"."account" drop constraint "account_client_id_fkey",
  add constraint "account_clientId_fkey"
  foreign key ("client_id")
  references "public"."client"
  ("id") on update restrict on delete restrict;
