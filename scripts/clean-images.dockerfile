# FROM public.ecr.aws/docker/library/rust:alpine3.22 AS base
# RUN apk --update add python3=~3.12.12 --virtual build-dependencies build-base gcc git
FROM public.ecr.aws/docker/library/rust:1.91.1-trixie AS base


FROM base AS exif-oxide
WORKDIR /app
RUN git clone --depth=1 https://github.com/photostructure/exif-oxide
WORKDIR exif-oxide
RUN make build
RUN make install

FROM exif-oxide AS exif
RUN apt-get update
RUN apt-get install -y libimage-exiftool-perl jq

FROM exif AS clean
WORKDIR /app
COPY scripts/find-location-data.sh scripts/clean-location-data.sh scripts/
ENTRYPOINT ["./scripts/clean-location-data.sh"]


