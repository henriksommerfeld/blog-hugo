#!/bin/bash
HUGO_VERSION="$(cat ./netlify.toml | grep HUGO_VERSION | head -1 | cut -d '=' -f 2 | cut -d '"' -f 2)"
target="/tmp/hugo-${HUGO_VERSION}-extended"
wget -q "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_Linux-64bit.tar.gz" -O $target.tar.gz || true

if [ ! -e $target.tar.gz ] || [ "$(stat --printf="%s" $target.tar.gz)" = "0" ]; then
  rm $target.tar.gz
  echo "Unable to download Hugo ${HUGO_VERSION} extended edition."
  exit 1
fi

# Unpack
mkdir -p $target
tar -zxf $target.tar.gz -C $target
cp "$target/hugo" /usr/local/bin/
rm -f $target.tar.gz