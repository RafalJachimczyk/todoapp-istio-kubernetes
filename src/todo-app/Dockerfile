FROM node:8

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install --silent

COPY src /usr/src/app/src
COPY public /usr/src/app/public

#RUN npm install react-scripts -g --silent
RUN npm run build
COPY /build /usr/share/nginx/html

FROM nginx:alpine

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
