FROM node:14.15.4
WORKDIR /usr/src/app
COPY docker/install-hugo.sh netlify.toml ./
RUN chmod +x install-hugo.sh ; ./install-hugo.sh
COPY package.json package-lock.json ./
RUN npm ci -only=production
