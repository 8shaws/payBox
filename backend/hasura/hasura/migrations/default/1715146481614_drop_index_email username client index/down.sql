CREATE  INDEX "email username client index" on
  "public"."client" using btree ("email", "username");
