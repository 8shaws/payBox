alter table "public"."client_settings" drop constraint "client_settings_client_id_fkey",
  add constraint "client_settings_client_id_fkey"
  foreign key ("client_id")
  references "public"."client"
  ("id") on update set default on delete no action;
