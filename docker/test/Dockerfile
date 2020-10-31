FROM node:14
#https://docs.cypress.io/guides/guides/continuous-integration.html#Dependencies
RUN apt-get update && apt-get -y install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
WORKDIR /usr/src/app
COPY docker/install-hugo.sh netlify.toml ./
RUN chmod +x install-hugo.sh ; ./install-hugo.sh
COPY package.json yarn.lock ./
RUN yarn
