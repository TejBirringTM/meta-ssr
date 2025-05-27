-- Create user: Server
CREATE ROLE be_server_user WITH LOGIN PASSWORD '${BE_SERVER_PWD}';
GRANT CONNECT ON DATABASE app_db TO be_server_user;
GRANT USAGE ON SCHEMA default_sch TO be_server_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA default_sch TO be_server_user;
-- Set default schema
ALTER USER be_server_user SET search_path TO default_sch;
