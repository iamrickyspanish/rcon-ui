FROM node:lts

ADD . /app
WORKDIR /app

RUN npm i

CMD ["npm", "start"]