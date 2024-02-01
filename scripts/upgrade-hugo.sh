#!/usr/bin/env bash

set -eo pipefail

release=$(curl -s https://api.github.com/repos/gohugoio/hugo/releases/latest)
input=$(jq -r .name <<<$release)

if [[ $input =~ v([0-9]+\.[0-9]+\.[0-9]+) ]]; then
	version="${BASH_REMATCH[1]}"
	echo "New version: $version"
else
	echo "Failed to retrieve version"
	exit 1
fi

netlify_regex="s/HUGO_VERSION = \"[0-9]+\.[0-9]+\.[0-9]+\"/HUGO_VERSION = \"$version\"/g"
dockerfile_regex1="s/hugo\/releases\/download\/v[0-9]+\.[0-9]+\.[0-9]+/hugo\/releases\/download\/v$version/g"
dockerfile_regex2="s/hugo_extended_[0-9]+\.[0-9]+\.[0-9]+/hugo_extended_$version/g"

files=(
	netlify.toml
	Dockerfile
)

cleanup() {
	for x in "${files[@]}"; do
		rm -f "$x.upg"
	done
	exit
}

trap cleanup EXIT

for x in "${files[@]}"; do
	sed -E "$netlify_regex" "$x" >"$x.upg"
	mv "$x.upg" "$x"
done

for x in "${files[@]}"; do
	sed -E "$dockerfile_regex1" "$x" >"$x.upg"
	mv "$x.upg" "$x"
done

for x in "${files[@]}"; do
	sed -E "$dockerfile_regex2" "$x" >"$x.upg"
	mv "$x.upg" "$x"
done
