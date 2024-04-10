CREATE OR REPLACE FUNCTION update_other_accounts()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.is_main = true THEN
        -- Set all other rows' is_main to false for the same client_id
        UPDATE account
        SET is_main = false
        WHERE client_id = NEW.client_id
          AND id != NEW.id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
