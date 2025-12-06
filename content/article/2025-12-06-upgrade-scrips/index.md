---
title: 'Simple Bash Updrade Scripts'
url: '/simple-bash-upgrade-scripts'
date: 2025-12-06
draft: false
description: 'Script I use for upgrading dependencies in various repos.'
summary: 'A thing I like to put in most repos are upgrade scripts. All software I work on have some dependency that needs upgrading from time to time. Package managers might do most of it, but there might be other references to version numbers that need updating, like a readme.'
tags: [scripting]
categories: [coding]
ogimage: upgrade-script-og.png
ogimagenoborder: true
---

A thing I like to put in most repos are upgrade scripts. All software I work on
have some dependency that needs upgrading from time to time. Package managers
might do most of it, but there might be other references to version numbers
that need updating, like a readme.

This web site is built on [Hugo][1] and there are actually 4 different files
that reference the version of Hugo that I'm using. When I make technical
changes I have a Github Actions workflow that builds the site and run tests.
Then there is a script that builds and deploys the site for Cloudflare Workers.
It's really silly to have the first one pass and then the deploy fail because
I'm building the site with different versions.

So, here is my Bash script for upgrading Hugo to the latest version.

``` bash
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

regex="s/HUGO_VERSION=\"[0-9]+\.[0-9]+\.[0-9]+\"/HUGO_VERSION=\"$version\"/g"
regex_yml="s/hugo-version\:\ '[0-9]+\.[0-9]+\.[0-9]+'/hugo-version\:\ '$version'/g"

files=(
  Dockerfile
  ./scripts/build.sh
  ./scripts/compose-hugo.dockerfile
  ./.github/workflows/master-pull-request.yml
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

for x in "${files[@]}"; do
  sed -E "$regex_yml" "$x" >"$x.upg"
  mv "$x.upg" "$x"
done
```

When I say "simple" in the title I'm mostly referring to the concept. I'm by no
means good at shell scripting, but it's the kind the thing that is easy to
iterate on locally with a trial-and-error approach, since it's so easy to
verify the result. And of course one can use any other preferred scripting
language instead of Bash for this.

Since this is my personal web site I don't really care about the dependencies
in the script itself (I'm using `curl`, `jq` and `sed` here). At work we have
the same kind of scripts and it's usually easy to agree on what's reasonable
for a script such as this to depend on (colleagues on Mac needing to replace
their ancient version of `sed` etc.)

Okay, let's run it.
``` shell
❯ ./scripts/upgrade-hugo.sh
New version: 0.152.2
```

Then it's just to push the change. This lowers the barrier to upgrading stuff,
especially for the repos that aren't currently worked on. At work we generally
want the latest {{<LTS />}} version of NodeJs and Dotnet, then this does the
job.

[1]: https://gohugo.io/
