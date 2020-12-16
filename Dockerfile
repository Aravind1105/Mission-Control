FROM node:lts-alpine AS builder
ARG AUTH_DOMAIN=${AUTH_DOMAIN_MC}
ENV AUTH_DOMAIN=${AUTH_DOMAIN}
ARG AUTH_CLIENT_ID=${AUTH_CLIENT_ID_MC}
ENV AUTH_CLIENT_ID=${AUTH_CLIENT_ID}
ARG AUTH_AUDIENCE=${AUTH_AUDIENCE_MC}
ENV AUTH_AUDIENCE=${AUTH_AUDIENCE}
WORKDIR /usr/src
COPY ./config ./config
COPY package.json package-lock.json ./ 
RUN apk --no-cache --virtual build-dependencies add \
    git
RUN npm install
COPY ./src ./src
COPY ./.env ./.env
RUN npm run build

FROM nginx:alpine as runner
ARG API_PROXY_URL=${API_PROXY_URL}
ENV API_PROXY_URL=${API_PROXY_URL}
COPY --from=builder /usr/src/dist /var/www
COPY ./config/nginx/nginx.conf.template /etc/nginx/nginx.conf.template
COPY docker-entrypoint.sh /
EXPOSE 8080
ENTRYPOINT ["/docker-entrypoint.sh"]
