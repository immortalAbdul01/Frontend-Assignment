FROM node:18-alpine as build_image
WORKDIR /app/react-app
COPY package.json .

RUN npm install

COPY . .

RUN npm run dev
