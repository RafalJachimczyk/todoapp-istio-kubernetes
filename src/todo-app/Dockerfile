FROM node:8

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install --silent

COPY src /usr/src/app/src
COPY public /usr/src/app/public

#RUN npm install react-scripts -g --silent
RUN npm run build

#COPY --from=builder build /usr/src/app/build

RUN npm install -g serve

EXPOSE 5000

CMD ["serve", "-s", "/usr/src/app/build"]
