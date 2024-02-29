FROM node:21.6.2

WORKDIR /app

COPY package*.json ./

RUN npm install

EXPOSE 3015

CMD ["npm", "start"]
