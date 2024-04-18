alter table "public"."connections" drop constraint "connections_client_settings_id_fkey",
  add constraint "connections_client_settings_id_fkey"
  foreign key ("client_settings_id")
  references "public"."client_settings"
  ("id") on update set default on delete no action;
