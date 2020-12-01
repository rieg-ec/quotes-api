FROM node:14.5-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
