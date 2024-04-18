alter table "public"."connections" drop constraint "connections_client_id_fkey",
  add constraint "connections_client_id_fkey"
  foreign key ("client_id")
  references "public"."client"
  ("id") on update no action on delete no action;
