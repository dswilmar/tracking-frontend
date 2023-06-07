FROM node:19-slim

WORKDIR /var/www/html

COPY package*.json ./

RUN npm install

RUN npm install serve -g --silent

COPY . .

EXPOSE 4000

CMD ["npm","run","build"]
