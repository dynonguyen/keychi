#!/bin/sh

echo "⬆️ Uploading data from local to minio..."

mc alias set myminio http://localhost:9000 ${MINIO_ROOT_USER} ${MINIO_ROOT_PASSWORD}
mc mb myminio/keychi
mc anonymous set public myminio/keychi
mc cp --recursive /sync/assets/* myminio/keychi
