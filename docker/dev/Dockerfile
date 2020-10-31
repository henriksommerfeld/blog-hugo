FROM node:14
WORKDIR /usr/src/app
COPY docker/install-hugo.sh netlify.toml ./
RUN chmod +x install-hugo.sh ; ./install-hugo.sh
COPY package.json yarn.lock ./
RUN yarn install --production
