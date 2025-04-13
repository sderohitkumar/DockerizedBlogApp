FROM node:23-alpine3.20 AS build

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

# Create a non-root user and group
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

# Set permissions (optional, but good practice)
RUN chown -R appuser:appgroup /usr/share/nginx/html
USER appuser

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]