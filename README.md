# Henrik Sommerfeld's Blog

[![Actions Status](https://github.com/henriksommerfeld/blog-hugo/actions/workflows/master-push.yml/badge.svg)](https://github.com/henriksommerfeld/blog-hugo/actions/workflows/master-push.yml) [![Netlify Status](https://api.netlify.com/api/v1/badges/beaa24ab-5442-45fd-a3bd-5050a70f22e5/deploy-status)](https://app.netlify.com/sites/henriksommerfeld/deploys) 

This is my personal blog based on [Hugo][1] available at <https://www.henriksommerfeld.se>

## Pre-requisites:
1. Install Node https://nodejs.org/en/download/ (working version specified in [.nvmrc](./.nvmrc))
2. Install Hugo https://github.com/gohugoio/hugo/releases See expected version in [netlify.toml](./netlify.toml)). Extended version required.

## Running the site
1. `npm run install:prod`
2. `npm start`

## Build (compile) the site to folder _public_
1. `npm run build`

## Tests (headless)
1. `npm install`
2. `npm test`

## Tests (Cypress GUI)
1. `npm install`
2. `npm run test:open`

[1]: http://gohugo.io/
