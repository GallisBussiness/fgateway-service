FROM node:lts-alpine3.15

WORKDIR /app

COPY package.json .

RUN npm install -g npm

RUN npm install && \
  npm install -g @nestjs/cli

COPY . .

EXPOSE 3100

CMD ["npm","run","start:dev"]