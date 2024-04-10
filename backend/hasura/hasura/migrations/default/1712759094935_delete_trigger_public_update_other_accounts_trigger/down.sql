CREATE TRIGGER "update_other_accounts_trigger"
AFTER UPDATE ON "public"."account"
FOR EACH ROW EXECUTE FUNCTION update_other_accounts();
