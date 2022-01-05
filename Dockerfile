FROM node:16.13.1-alpine3.15

WORKDIR /src

COPY package*.json .

RUN npm install --production --silent

COPY . .

EXPOSE ${PORT}

CMD ["npm", "run" ,"build"]