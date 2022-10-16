install:
	npm ci
	
gendiff:
	node bin/gendiff.js

lint:
	npx eslint

install-deps:
	npm ci

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8


publish:
	npm publish