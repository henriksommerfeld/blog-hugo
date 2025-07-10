# Henrik Sommerfeld

This is my personal blog based on [Hugo][1] available at <https://www.henriksommerfeld.se>

## Local dev

[package.json](./package.json) contains a bunch of scripts that act as documentation.

### Using Docker and Docker Compose
1. To run the site: `docker-compose up`
2. To run the tests: `docker build`

### Using NPM

#### Pre-requisites:
1. Install Node https://nodejs.org/en/download/ (working version specified in [.nvmrc](./.nvmrc))
2. Install Hugo https://github.com/gohugoio/hugo/releases See expected version in [netlify.toml](./netlify.toml)). Extended version required.

#### Running the site
1. `npm run install:prod`
2. `npm start`

[1]: http://gohugo.io/
