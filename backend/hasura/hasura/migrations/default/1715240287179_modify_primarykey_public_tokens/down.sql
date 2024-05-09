alter table "public"."tokens" drop constraint "tokens_pkey";
alter table "public"."tokens"
    add constraint "mint_tokens_pkey"
    primary key ("id");
