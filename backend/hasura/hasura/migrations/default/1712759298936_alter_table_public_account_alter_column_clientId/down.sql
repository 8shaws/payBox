alter table "public"."account" rename column "client_id" to "clientId";
comment on column "public"."account"."clientId" is NULL;
