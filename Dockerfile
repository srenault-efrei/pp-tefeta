FROM node:12 as builder
WORKDIR /app
COPY package.json yarn.lock babel.config.js /app/
COPY src ./src
RUN yarn install
RUN yarn start
