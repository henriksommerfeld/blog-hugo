#!/usr/bin/env bash

if [ -z "$1" ]; then
  echo "Provide a name. Example: ./scripts/new-article.sh dummy-post"
  exit 1
fi

hugo new "content/article/$(date --iso-8601)-$1/index.md"
