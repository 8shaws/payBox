CREATE UNIQUE INDEX "email username client index" on
  "public"."client" using btree ("username", "email");
