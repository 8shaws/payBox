CREATE OR REPLACE FUNCTION update_other_accounts()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.is_main = true THEN
        UPDATE account
        SET is_main = false
        WHERE clientId = NEW.clientId
        AND id != NEW.id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_other_accounts_trigger
AFTER UPDATE OF is_main ON account
FOR EACH ROW
EXECUTE FUNCTION update_other_accounts();
