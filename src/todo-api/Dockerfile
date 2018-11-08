FROM node:8

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
COPY src /usr/src/app/src
EXPOSE 8080
CMD ["npm", "start"]