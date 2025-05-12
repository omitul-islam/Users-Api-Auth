FROM node:22.14.0

WORKDIR /src/app

COPY package*.json ./

RUN npm install
COPY .env .env

COPY . .

RUN npm run build


EXPOSE 5001

CMD ["node", "dist/src/main.js"]
