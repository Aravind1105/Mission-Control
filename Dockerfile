FROM nginx:1.15.9-alpine
ARG API_PROXY_URL=proxy_url_from_env 
ENV API_PROXY_URL=${API_PROXY_URL}
COPY ./dist /var/www
COPY ./config/nginx/nginx.conf.template /etc/nginx/nginx.conf.template
COPY docker-entrypoint.sh /
EXPOSE 8080
ENTRYPOINT ["/docker-entrypoint.sh"]