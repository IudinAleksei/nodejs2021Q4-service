FROM node:16.13.1-alpine3.15

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm cache clean --force

COPY . .

RUN npx prisma generate

CMD ["npm", "run" ,"start:dev"]