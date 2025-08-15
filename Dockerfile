FROM mcr.microsoft.com/playwright:v1.54.2 AS playwright

FROM playwright AS playwright-hugo
ARG HUGO_VERSION="0.148.1"
RUN wget --max-redirect=1 -O /tmp/hugo.tar.gz "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_Linux-64bit.tar.gz"
RUN tar zxvf /tmp/hugo.tar.gz -C /tmp/
RUN mv /tmp/hugo /usr/bin/

FROM playwright-hugo AS install
WORKDIR /app
COPY .nvmrc package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
  npm ci --no-update-notifier --no-audit --no-fund
RUN npx playwright install

FROM install AS build
COPY playwright.config.ts config.toml config-dev.toml ./
COPY assets ./assets
COPY build ./build
COPY content ./content
COPY layouts ./layouts
COPY resources ./resources
COPY static ./static
COPY tests ./tests
RUN npm run build

# UI tests are sometimes flaky, so always run them
FROM build AS test
ARG CACHEBUST=1
RUN echo "$CACHEBUST"
RUN npm run test
