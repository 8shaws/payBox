CREATE  INDEX "username email client index" on
  "public"."client" using btree ("email", "username");
