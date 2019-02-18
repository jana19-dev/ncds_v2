FROM node:10-alpine

RUN apk update && apk upgrade && \
    apk add --no-cache git && \
    npm install -g @sanity/cli && \
    npm install --global gatsby-cli
