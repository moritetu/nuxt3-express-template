APPNAME         := app
PACKAGE_DIR      := dist
PROJECT_DIR      := $(shell basename $(shell pwd))
VERSION          := 0.0.1
PACKAGESRC_FILE  := $(APPNAME)-$(VERSION).src.tar.gz
PACKAGE_FILE     := $(APPNAME)-$(VERSION).tar.gz
TAG              ?= latest

all: package

.PHONY: archive
archive: ## Make a source archive.
	mkdir -p $(PACKAGE_DIR)
	cd .. && \
	tar $(addprefix --exclude ,.nuxt .git .output "*.log" coverage node_modules .env .DS_Store dist) \
		-czf $(PACKAGESRC_FILE) $(PROJECT_DIR) && \
	mv $(PACKAGESRC_FILE) $(PROJECT_DIR)/dist/

.PHONY: package
package: build ## Build and make a package.
	mkdir -p $(PACKAGE_DIR)
	tar -czf $(PACKAGE_FILE) .output
	mv $(PACKAGE_FILE) ./dist/

.PHONY: build
build: ## Build application.
	yarn build

.PHONY: clean
clean: ## Clean resources.
	rm -rf .nuxt .output *.sqlite $(PACKAGE_DIR)

# Based on https://github.com/mattermost/mattermost-server/blob/master/Makefile
help:
	@grep -E '^[0-9a-zA-Z_-]+:.*?## .*$$' ./Makefile | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
	@echo
