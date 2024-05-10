comment on column "public"."ata"."privateKey" is E'associated token account';
alter table "public"."ata" add constraint "ata_privateKey_key" unique (privateKey);
alter table "public"."ata" alter column "privateKey" drop not null;
alter table "public"."ata" add column "privateKey" text;
