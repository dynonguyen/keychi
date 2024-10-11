#!/bin/sh

root_dir="$(pwd)"
docker_dir="$root_dir/docker"

./scripts/clone-env.sh

# Start the docker containers
cd $docker_dir
docker compose up -d

# Sync minio data
echo "😴 Waiting for Minio to start..."

sleep 2
yarn minio:upload
