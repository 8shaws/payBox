CREATE  INDEX "time txn index" on
  "public"."transactions" using btree ("time");
