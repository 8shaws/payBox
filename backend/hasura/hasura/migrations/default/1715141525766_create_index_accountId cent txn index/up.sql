CREATE  INDEX "accountId cent txn index" on
  "public"."centralized_txn" using btree ("account_id");
