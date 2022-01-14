FROM node:16.13.1-alpine3.15

WORKDIR /app

COPY package*.json .

RUN npm install --omit=optional

RUN npm cache clean --force

COPY . .

CMD ["npm", "run" ,"start:watch"]