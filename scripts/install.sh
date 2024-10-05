#!/bin/sh

root_dir="$(pwd)"
docker_dir="$root_dir/docker"

# Supabse
cd $docker_dir/supabase
cp .env.example .env
docker-compose up -d
