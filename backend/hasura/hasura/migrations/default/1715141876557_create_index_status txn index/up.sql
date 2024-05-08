CREATE  INDEX "status txn index" on
  "public"."transactions" using btree ("status");
