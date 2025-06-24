FROM registry.access.redhat.com/ubi9/nodejs-22:latest
USER root
# RUN yum update -y && yum upgrade -y
RUN npm -v
ENV PORT 8080
WORKDIR /usr/src/app
RUN mkdir -p /usr/src/app/.next/cache/images
RUN chown -R 1001:0 /usr/src/app
RUN chgrp -R 0 /usr/src/app && \ 
    chmod -R g=u /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
USER 1001
EXPOSE 8080
CMD [ "npm", "start" ]