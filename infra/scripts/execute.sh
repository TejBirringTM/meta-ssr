# Exit on error
set -e;

# Substitute specified template to produce SQL
sql="$(./substitute.sh $1)";

# Execute SQL
docker exec -i "${APP_NAME}_postgres" psql -U postgres_admin -d app_db <<< "$sql";

