CREATE  INDEX "client main account index" on
  "public"."account" using btree ("client_id", "is_main");
