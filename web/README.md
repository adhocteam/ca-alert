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

Test coverage is handled by Istanbul's [nyc](https://github.com/istanbuljs/nyc) tool.

``` shell
$ make coverage
```


### Building the app

Builing the app compiles the JavaScript source into a single bundle file,
using [Webpack](https://webpack.js.org/). The output is a file
called `dist/bundle.js`.

``` shell
$ make build
```

You can also have Webpack watch for changes and automatically recompile when you
save files during development. The following is equivalent to `make build` with
auto-recompile:

``` shell
$ make watch
```

This runs a persistent process in the foreground, so you'll need to `Ctrl-C` out
of it to shut it down when you're done.

### Serving the app locally

To run the app locally, use Webpack's development server, which will build the
app, watch for changes, automatically recompile your source files when you save,
and reload the page in your browser if it's open:

``` shell
$ make serve
```

By default, this runs a server on port 8080, so point your browser
at [http://localhost:8080](http://localhost:8080).

### Building the app for a production release

The build is parameterized for different environments. For example, the API host
is configured based on which environment the frontend is executing in. To build
for a production environment:

``` shell
$ make release
```
