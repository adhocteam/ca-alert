all: build

.PHONY: build
build:
	./node_modules/.bin/webpack -d --config webpack.config.js


release:
	NODE_ENV=production ./node_modules/.bin/webpack -p --config webpack.config.js

.PHONY: test
test:
	./node_modules/.bin/mocha --require babel-core/register --compilers css:test/null-compilers.js

.PHONY: coverage
coverage:
	./node_modules/.bin/nyc --extension .jsx ./node_modules/.bin/mocha --require babel-core/register --compilers css:test/null-compilers.js

