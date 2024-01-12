FROM node:20.11.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci 

USER node

COPY src/ .

CMD ["node", "index.js"]
