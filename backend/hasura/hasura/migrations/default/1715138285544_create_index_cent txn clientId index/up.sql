CREATE  INDEX "cent txn clientId index" on
  "public"."centralized_txn" using btree ("client_id");
