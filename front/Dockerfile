FROM node:16-alpine3.14

RUN npm install -g serve
RUN apk --no-cache add git

WORKDIR /app

COPY package.json /app/

RUN npm install

COPY . /app/

RUN npm run build

EXPOSE 3000
CMD [ "serve", "-s", "build"]