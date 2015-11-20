FROM node:latest

WORKDIR /app
COPY dist/ /app/
COPY package.json /app/
RUN npm install --production

ENTRYPOINT ["node", "server/entry.js"]
