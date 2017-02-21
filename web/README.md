🌴Web frontend of California emergency alerts prototype
======================================================

Development
-----------

### Installation

#### Dependencies

Development requires Node and yarn.

Install [Node.js](https://nodejs.org/en/). v6.9.5 LTS or later is recommended.

Install [yarn](https://yarnpkg.com/):

``` shell
$ npm install -g yarn
```

Now install the dependencies:

``` shell
$ yarn
```

### Running tests

Tests are handled by [Mocha](https://mochajs.org/).

``` shell
$ make test
```

### Building the app

Builing the app compiles the JavaScript source into a single bundle file,
using [Webpack](https://webpack.js.org/). The output is a file
called `dist/bundle.js`.

``` shell
$ make build
```

### Building the app for a production release

The build is parameterized for different environments. For example, the API host
is configured based on which environment the frontend is executing in. To build
for a production environment:

``` shell
$ make release
```
