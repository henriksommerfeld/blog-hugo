FROM node:20.11.0-alpine as base
RUN apk add --update tzdata rsync openssh gcompat libc6-compat libstdc++

FROM base as hugo
RUN wget -O /tmp/hugo.tar.gz https://github.com/gohugoio/hugo/releases/download/v0.122.0/hugo_extended_0.122.0_Linux-64bit.tar.gz
RUN tar zxvf /tmp/hugo.tar.gz -C /tmp/
RUN mv /tmp/hugo /usr/bin/
RUN hugo version

