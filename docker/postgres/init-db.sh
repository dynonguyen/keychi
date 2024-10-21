#!/bin/bash
set -e

function create_user_and_database() {
	local database=$1

	psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
		CREATE DATABASE $database;
		GRANT ALL PRIVILEGES ON DATABASE $database TO $POSTGRES_USER;
	EOSQL
}

if [ -n "$POSTGRES_MULTIPLE_DATABASES" ]; then
	echo "--- Multiple database creation requested: $POSTGRES_MULTIPLE_DATABASES ---"

	for db in $(echo $POSTGRES_MULTIPLE_DATABASES | tr ',' ' '); do
		create_user_and_database $db
	done
fi
