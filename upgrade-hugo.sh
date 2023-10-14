#!/usr/bin/env bash

set -eo pipefail

input=$(hugo version)

if [[ $input =~ v([0-9]+\.[0-9]+\.[0-9]+) ]]; then
	version="${BASH_REMATCH[1]}"
	echo "New version: $version"
else
	echo "Version not found using 'hugo version'"
	exit 1
fi

regex="s/HUGO_VERSION = \"[0-9]+\.[0-9]+\.[0-9]+\"/HUGO_VERSION = \"$version\"/g"

file=netlify.toml

cleanup() {
	rm -f "$file.upg"
	exit
}

trap cleanup EXIT

sed -E "$regex" "$file" >"$file.upg"
mv "$file.upg" "$file"
