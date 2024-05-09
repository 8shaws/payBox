alter table "public"."token"
  add constraint "token_authId_fkey"
  foreign key ("authId")
  references "public"."client"
  ("id") on update no action on delete no action;
