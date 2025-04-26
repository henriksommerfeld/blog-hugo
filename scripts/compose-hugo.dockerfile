FROM node:22.15.0-alpine AS base
RUN apk add --update tzdata rsync openssh gcompat libc6-compat libstdc++ wget

FROM base AS hugo
ARG HUGO_VERSION="0.147.0"
RUN wget --max-redirect=1 -O /tmp/hugo.tar.gz "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_Linux-64bit.tar.gz"
RUN tar zxvf /tmp/hugo.tar.gz -C /tmp/
RUN mv /tmp/hugo /usr/bin/
RUN hugo version

