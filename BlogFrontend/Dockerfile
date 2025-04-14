FROM node:23-alpine3.20 AS build

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

#Create a non-root user and group
RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser

#Set permissions (optional, but good practice)
RUN chown -R appuser:appgroup /usr/share/nginx/html

RUN mkdir -p /var/cache/nginx/client_temp && \
    chown -R appuser:appgroup /var/cache/nginx

RUN mkdir -p /var/run && chown -R appuser:appgroup /var/run

USER appuser

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]