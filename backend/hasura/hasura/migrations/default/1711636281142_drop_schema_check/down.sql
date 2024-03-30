-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- drop schema "check" cascade;
DO $$ 
BEGIN
    IF EXISTS (SELECT schema_name FROM information_schema.schemata WHERE schema_name = 'check') THEN
        EXECUTE 'DROP SCHEMA check CASCADE';
    END IF;
END $$;