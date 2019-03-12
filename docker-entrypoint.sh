#!/usr/bin/env sh
set -eu

envsubst '${API_PROXY_URL}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && exec nginx -g 'daemon off;'

exec "$@"