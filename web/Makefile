all: build

build:
	./node_modules/.bin/webpack -d --config webpack.config.js

.PHONY: build

release:
	NODE_ENV=production ./node_modules/.bin/webpack -p --config webpack.config.js

test:
	./node_modules/.bin/mocha --require babel-core/register

.PHONY: test
