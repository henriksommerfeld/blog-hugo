#!/usr/bin/env bash

set -eo pipefail

release=$(curl -s https://api.github.com/repos/gohugoio/hugo/releases/latest)
input=$(jq -r .name <<<"$release")

if [[ $input =~ v([0-9]+\.[0-9]+\.[0-9]+) ]]; then
	version="${BASH_REMATCH[1]}"
	echo "New version: $version"
else
	echo "Failed to retrieve version"
	exit 1
fi

regex="s/(HUGO_VERSION\s*=\s*)\"[0-9]+\.[0-9]+\.[0-9]+\"/\1\"$version\"/g"

files=(
	wrangler.toml
	Dockerfile
	./scripts/compose-hugo.dockerfile
)

cleanup() {
	for x in "${files[@]}"; do
		rm -f "$x.upg"
	done
	exit
}

trap cleanup EXIT

for x in "${files[@]}"; do
	sed -E "$regex" "$x" >"$x.upg"
	mv "$x.upg" "$x"
done

echo "Rebuilding docker image for docker-compose"
docker compose build
