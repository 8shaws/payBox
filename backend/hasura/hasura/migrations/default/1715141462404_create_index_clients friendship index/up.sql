CREATE  INDEX "clients friendship index" on
  "public"."friendship" using btree ("clientId1", "clientId2");
