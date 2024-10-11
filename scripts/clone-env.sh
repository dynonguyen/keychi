#!/bin/sh

root_dir="$(pwd)"

for dir in docker api apps/web apps/desktop apps/mobile apps/extensions; do
    cp "$root_dir/$dir/.env.example" "$root_dir/$dir/.env"
done

echo "🥲 Environment files cloned successfully!"
