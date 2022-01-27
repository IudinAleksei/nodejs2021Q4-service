FROM node:16.13.1-alpine3.15

WORKDIR /app

COPY package*.json ./prisma/schema.prisma ./

RUN npm install

RUN npm cache clean --force

RUN npx prisma generate

# RUN npx prisma migrate dev --name user --preview-feature

COPY ./ ./

CMD ["npm", "run" ,"start:migrate"]