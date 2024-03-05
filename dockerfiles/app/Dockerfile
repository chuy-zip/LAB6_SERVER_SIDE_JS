FROM node:21.6.2

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install express

COPY ./src .

CMD ["npm", "start"]
