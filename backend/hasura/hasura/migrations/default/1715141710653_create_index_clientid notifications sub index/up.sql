CREATE  INDEX "clientid notifications sub index" on
  "public"."notification_subscription" using btree ("clientId");
