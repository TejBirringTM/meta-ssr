-- Drop the default database.
DROP DATABASE postgres;

-- Drop the default schema.
DROP SCHEMA public;

-- Create schema for access control (user project permissions).
CREATE SCHEMA access_control_sch;

-- Create user: ORM Admin (to execute migrations).
CREATE ROLE be_orm_admin_user WITH LOGIN PASSWORD '${BE_ORM_ADMIN_PWD}';
GRANT CONNECT ON DATABASE app_db TO be_orm_admin_user;
GRANT ALL PRIVILEGES ON SCHEMA access_control_sch TO be_orm_admin_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA access_control_sch TO be_orm_admin_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA access_control_sch TO be_orm_admin_user;
-- Set default schema
ALTER USER be_orm_admin_user SET search_path TO access_control_sch;
