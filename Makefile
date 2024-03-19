.PHONY: initialize start commit build versions

DOCKER_IMAGE = "example"

init: ## Initialize npm dependencies
	@echo "initializing npm dependencies"
	npm ci

start: ## Start a local development server
	npm run start

build: ## Run npm build
	@echo "building site"
	rm -rf build
	npm run build


versions: ## Create Docusarus content versions
	@echo "creating versions"
	./scripts/versions.sh $(TMPDIR)


versions-ci: ## Create Docusarus content versions in a GitHub Actions CI environment
	@echo "creating versions"
	./scripts/versions.sh $$RUNNER_TEMP


clean-versions: ## Clean Docusarus content versions
	@echo "cleaning versions"
	rm -rf versions.json versioned_docs versioned_sidebars
	git checkout -- docusaurus.config.js static/robots.txt

## Docker

docker-build: ## Build the Docker image
	@echo "building Docker image"
	docker build -t $(DOCKER_IMAGE) .

docker-run: ## Run the Docker image
	@echo "running Docker image"
	docker run -p 3000:3000 -it $(DOCKER_IMAGE) bash