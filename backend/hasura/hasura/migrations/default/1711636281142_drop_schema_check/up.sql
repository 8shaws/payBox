DO $$ 
BEGIN
    IF EXISTS (SELECT schema_name FROM information_schema.schemata WHERE schema_name = 'check') THEN
        EXECUTE 'DROP SCHEMA check CASCADE';
    END IF;
END $$;