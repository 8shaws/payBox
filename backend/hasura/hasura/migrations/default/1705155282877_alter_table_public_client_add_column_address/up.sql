alter table "public"."client" add column "address" jsonb
 not null default jsonb_build_array();
