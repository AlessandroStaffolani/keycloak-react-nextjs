# base image
FROM node:12-alpine

# set working directory
WORKDIR /usr/src/app

# install and cache app dependencies
COPY client ./

RUN npm install

EXPOSE 3000

COPY run.sh /usr/src/app/run.sh
RUN chmod +x /usr/src/app/run.sh

# start app
CMD ["/usr/src/app/run.sh"]
