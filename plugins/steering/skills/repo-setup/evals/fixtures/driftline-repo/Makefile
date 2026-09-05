.PHONY: build lint check clean

build:
	node build.mjs

lint:
	npx eslint main.mjs

check: lint
	node --test

clean:
	rm -rf dist/
