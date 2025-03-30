FROM node:23-alpine3.20 AS build

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

ARG ENVIRONMENT
RUN npm run build:$ENVIRONMENT

FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]