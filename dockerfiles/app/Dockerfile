FROM node:21.6.2

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./src ./src

CMD ["npm", "start"]
