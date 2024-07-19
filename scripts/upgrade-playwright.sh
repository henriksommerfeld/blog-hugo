#!/usr/bin/env bash

set -eo pipefail

npm i @playwright/test@latest

version=$(jq '.devDependencies."@playwright/test"' package.json | tr -d '"' | tr -d '^')

if [[ -z "$version" ]] || [[ ! "$version" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
	echo "Failed to retrieve version"
	exit 1
fi

regex="s/playwright:v[0-9]+\.[0-9]+\.[0-9]+/playwright:v$version/g"

file=Dockerfile

cleanup() {
	rm -f "$file.upg"
	exit
}

trap cleanup EXIT

sed -E "$regex" "$file" >"$file.upg"
mv "$file.upg" "$file"
