# Henrik Sommerfeld's Blog

[![Actions Status](https://github.com/henriksommerfeld/isabel-blog/workflows/Blog%20tests/badge.svg)](https://github.com/henriksommerfeld/blog-hugo/actions) [![Netlify Status](https://api.netlify.com/api/v1/badges/beaa24ab-5442-45fd-a3bd-5050a70f22e5/deploy-status)](https://app.netlify.com/sites/henriksommerfeld/deploys) 

This is my personal blog based on [Hugo][1] available at <https://www.henriksommerfeld.se>

## Pre-requisites:
1. Install Node https://nodejs.org/en/download/ (working version specified in [.nvmrc](./.nvmrc))
2. Install Hugo https://github.com/gohugoio/hugo/releases See expected version in [netlify.toml](./netlify.toml)). Extended version required.
3. Install [Yarn][2] (version 1).

## Running the site
1. `yarn install:prod`
2. `yarn start`

## Build (compile) the site to folder _public_
1. `yarn build`

## Tests (headless)
1. `yarn install`
2. `yarn test`

## Tests (Cypress GUI)
1. `yarn install`
2. `yarn test:open`

## Using Docker
For using [Docker][3], you don't need the pre-requisites listed above, but you need Docker 🙄

### Running the site
1. `docker-compose up dev`
or if you have yarn installed: `yarn docker:dev`

### Build (compile) the site to folder _public_
1. `docker-compose up build`
or if you have yarn installed: `yarn docker:build`

### Tests
1. `docker-compose up test`
or if you have yarn installed: `yarn docker:test`


### Rebuild Docker image when dependencies change
1. `yarn docker:image:rebuild`

[1]: http://gohugo.io/
[2]: https://yarnpkg.com/
[3]: https://docker.io/