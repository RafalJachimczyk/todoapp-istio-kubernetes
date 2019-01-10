FROM node:8 as build-deps

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install --silent

COPY src /usr/src/app/src
COPY public /usr/src/app/public

#RUN npm install react-scripts -g --silent
RUN npm run build

FROM nginx:alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
