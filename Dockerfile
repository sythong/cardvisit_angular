# Stage 1
FROM node:10-alpine as build-step

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .
# RUN npm run build --prod
EXPOSE 4200

CMD npm run start
