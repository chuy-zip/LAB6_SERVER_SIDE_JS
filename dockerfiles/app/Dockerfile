FROM node:21.6.2

WORKDIR /app

COPY package*.json ./

RUN npm install

EXPOSE 22107

CMD ["npm", "start"]
