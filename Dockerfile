FROM mcr.microsoft.com/playwright:v1.41.1 as playwright
RUN npx playwright install

FROM playwright as playwright-hugo
RUN wget --output-document hugo.tar.gz https://github.com/gohugoio/hugo/releases/download/v0.122.0/hugo_extended_0.122.0_Linux-64bit.tar.gz
RUN tar zxvf hugo.tar.gz
RUN cp hugo /usr/bin/

FROM playwright-hugo as install
WORKDIR /app
COPY .nvmrc package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
  npm ci --no-update-notifier --no-audit --no-fund

FROM install as build
COPY playwright.config.ts config.toml config-dev.toml ./
COPY assets ./assets
COPY build ./build
COPY content ./content
COPY layouts ./layouts
COPY resources ./resources
COPY static ./static
COPY tests ./tests
RUN npm run build

FROM build as test
ARG CACHEBUST=1
RUN echo "$CACHEBUST"
RUN npm run test
