FROM node:20.11.1-alpine as base
RUN apk add --update tzdata rsync openssh gcompat libc6-compat libstdc++ wget

FROM base as hugo
ARG HUGO_VERSION="0.123.7"
RUN wget --max-redirect=1 -O /tmp/hugo.tar.gz "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_Linux-64bit.tar.gz"
RUN tar zxvf /tmp/hugo.tar.gz -C /tmp/
RUN mv /tmp/hugo /usr/bin/
RUN hugo version
