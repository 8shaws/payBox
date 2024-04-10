CREATE TRIGGER update_other_accounts_trigger
AFTER UPDATE OF is_main ON account
FOR EACH ROW
EXECUTE FUNCTION update_other_accounts();
