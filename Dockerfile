FROM node:10.15.3-alpine
WORKDIR /app
COPY package.json babel.config.js ./
COPY src ./src
COPY data ./data
RUN yarn install
RUN yarn start
