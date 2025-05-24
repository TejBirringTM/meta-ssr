-- Drop the default database.
DROP DATABASE postgres;

-- Drop the default schema.
DROP SCHEMA public;

-- Create schema for access control (user project permissions).
CREATE SCHEMA access_control_sch;

-- Create user: ORM Admin
CREATE ROLE be_orm_admin_user WITH LOGIN PASSWORD '${BE_ORM_ADMIN_PWD}';
GRANT CONNECT ON DATABASE app_db TO be_orm_admin_user;
GRANT CREATE, USAGE ON SCHEMA access_control_sch TO be_orm_admin_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA access_control_sch TO be_orm_admin_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA access_control_sch TO be_orm_admin_user;

-- Create user: Server
CREATE ROLE be_server_user WITH LOGIN PASSWORD '${BE_SERVER_PWD}';
GRANT CONNECT ON DATABASE app_db TO be_server_user;
GRANT USAGE ON SCHEMA access_control_sch TO be_server_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA access_control_sch TO be_server_user;

-- Set default schema for both users.
ALTER USER be_orm_admin_user SET search_path TO access_control_sch;
ALTER USER be_server_user SET search_path TO access_control_sch;
