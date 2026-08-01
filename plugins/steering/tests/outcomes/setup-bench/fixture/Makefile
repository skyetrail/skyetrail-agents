.PHONY: build lint check clean

build:
	node build.mjs

lint:
	npx eslint src/

check: lint
	node --test

clean:
	rm -rf dist/
