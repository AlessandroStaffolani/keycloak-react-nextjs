# base image
FROM node:12-alpine

# set working directory
WORKDIR /usr/src/app

# install and cache app dependencies
COPY . .

RUN npm install

RUN npm run build

EXPOSE 5000

CMD npm run start
