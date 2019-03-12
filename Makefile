include .env
export $(shell sed 's/=.*//' .env)

VERSION=$(shell ./scripts/version.sh)

.PHONY: help

help: ## Show commands and description.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

build: build-dist build-docker ## Build dist and docker image

build-dist: ## Build the application dist
	npm run build

build-docker: ## Build the docker container from dist
	docker build --build-arg API_PROXY_URL=$(API_PROXY_URL) --rm -f Dockerfile -t $(DOCKER_REGISTRY)$(APP_NAME):$(VERSION) .

run-local: ## Run docker image local
	docker run --rm -d -p $(APP_PORT_DEV):$(APP_PORT_PROD) $(DOCKER_REGISTRY)$(APP_NAME):$(VERSION)

deploy-docker: ## Deploys the docker image to Gcloud
	docker push $(DOCKER_REGISTRY)$(APP_NAME):$(VERSION)

deploy-staging: ## Deploy to staging
	kubectl apply -f config/k8s/mc-stage-app-deployment.yaml --namespace=staging

deploy-staging-service: ## Deploy staging service
	kubectl apply -f config/k8s/mc-stage-app-service.yaml --namespace=staging