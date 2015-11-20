FROM node:latest

ENTRYPOINT ["node", "dist/server/entry.js"]
WORKDIR /app
COPY . /app

