all: build

.PHONY: build serve test coverage

build:
	./node_modules/.bin/webpack -d --config webpack.config.js

serve:
	./node_modules/.bin/webpack-dev-server -d --config webpack.config.js --progress --colors

watch:
	./node_modules/.bin/webpack -d --config webpack.config.js --watch --progress --colors

release:
	NODE_ENV=production ./node_modules/.bin/webpack -p --config webpack.config.js

test:
	./node_modules/.bin/mocha --require babel-core/register --compilers css:test/null-compilers.js

coverage:
	./node_modules/.bin/nyc --extension .jsx ./node_modules/.bin/mocha --require babel-core/register
