alter table "public"."ata"
  add constraint "ata_clientId_fkey"
  foreign key ("clientId")
  references "public"."client"
  ("id") on update no action on delete no action;
