include .env
export $(shell sed 's/=.*//' .env)

VERSION=$(shell git describe --abbrev=0 --tags |cut -c 2-)

.PHONY: help

help: ## Show commands and description.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

build: build-dist build-docker ## Build dist and docker image

build-dist: ## Build the application dist
	npm run build

build-docker: ## Build the docker container from dist
	docker build \
		--build-arg API_PROXY_URL="$(API_PROXY_URL)" \
		--build-arg AUTH_DOMAIN="$(AUTH_DOMAIN)" \
		--build-arg AUTH_CLIENT_ID="$(AUTH_CLIENT_ID)" \
		--build-arg AUTH_AUDIENCE="$(AUTH_AUDIENCE)" \
		--rm -f Dockerfile -t $(DOCKER_REGISTRY)$(APP_NAME):$(VERSION) .

run-local: ## Run docker image local
	docker run --rm -d -p $(APP_PORT_DEV):$(APP_PORT_PROD) $(DOCKER_REGISTRY)$(APP_NAME):$(VERSION)

deploy-docker: ## Deploys the docker image to Gcloud
	docker push $(DOCKER_REGISTRY)$(APP_NAME):$(VERSION)

deploy-staging: ## Deploy to staging
	kubectl apply -f config/k8s/mc-stage-app-deployment.yaml --namespace=staging

deploy-staging-service: ## Deploy staging service
	kubectl apply -f config/k8s/mc-stage-app-service.yaml --namespace=staging

deploy-production: ## Deploy to production
	kubectl apply -f config/k8s/mc-prod-app-deployment.yaml --namespace=production

deploy-production-service: ## Deploy staging service
	kubectl apply -f config/k8s/mc-prod-app-service.yaml --namespace=production