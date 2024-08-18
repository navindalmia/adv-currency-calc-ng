FROM node:20.13.1-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:stable
COPY --from=build /app/dist/adv-currency-calc-ng/browser/ /usr/share/nginx/html
EXPOSE 80
