CREATE  INDEX "username email client index" on
  "public"."client" using btree ("username", "email");
