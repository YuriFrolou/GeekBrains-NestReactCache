FROM node:19-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm i @nx-tools/nx-docker

RUN npm install -g nx

RUN npm run build:web

EXPOSE 3002



