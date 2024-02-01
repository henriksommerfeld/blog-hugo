#!/usr/bin/env bash

set -eo pipefail

version=$(curl -s https://nodejs.org/dist/index.json |
	jq -r '. | map(select(.lts != false))[0] | .version[1:]')

if [[ -z "$version" ]] || [[ ! "$version" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
	echo "Failed to retrieve version"
	exit 1
fi

echo $version

regex="s/node:[0-9]+\.[0-9]+\.[0-9]+/node:$version/g"

file=scripts/compose-hugo.dockerfile

cleanup() {
	rm -f "$file.upg"
	exit
}

trap cleanup EXIT

sed -E "$regex" "$file" >"$file.upg"
mv "$file.upg" "$file"

printf "v$version" >.nvmrc
