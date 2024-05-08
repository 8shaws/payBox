CREATE  INDEX "clientId txn index" on
  "public"."transactions" using btree ("clientId");
