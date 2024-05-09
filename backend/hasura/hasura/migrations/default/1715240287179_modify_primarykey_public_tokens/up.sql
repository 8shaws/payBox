BEGIN TRANSACTION;
ALTER TABLE "public"."tokens" DROP CONSTRAINT "mint_tokens_pkey";

ALTER TABLE "public"."tokens"
    ADD CONSTRAINT "mint_tokens_pkey" PRIMARY KEY ("id", "pubKey");
COMMIT TRANSACTION;
