FROM node:12 as builder
WORKDIR /app
COPY package.json babel.config.js ./
COPY src ./src
COPY data ./data
RUN yarn install
RUN yarn start
