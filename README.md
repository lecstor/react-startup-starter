React Startup Starter
=====================

* [React](https://github.com/facebook/react) A Javascript library for building user interfaces
* [Redux](https://github.com/rackt/redux) Redux is a predictable state container for JavaScript apps
* [react-router](https://github.com/rackt/react-router) A complete routing solution for React.js
* [redux-simple-router](https://github.com/jlongster/redux-simple-router) Ruthlessly simple bindings to keep react-router and redux in sync
* [Babel](https://babeljs.io/)(6) Next gen (ES6/7/etc) Javascript compiler
* [Webpack](https://webpack.github.io/) A bundler for javascript and friends
* [Karma](http://karma-runner.github.io/) Spectacular Test Runner for JavaScript
* [Tape](https://github.com/substack/tape) tap-producing test harness for node and browsers
* [Enzyme](https://github.com/airbnb/enzyme) Enzyme is a JavaScript testing utility for React ([airbnb.io](http://airbnb.io))
* [Istanbul](https://github.com/gotwarlost/istanbul) A Javascript code coverage tool written in JS
* [ESLint](http://eslint.org) The pluggable linting utility for JavaScript and JSX
* [node-config](https://github.com/lorenwest/node-config) Node.js Application Configuration
* [redux-form](http://erikras.github.io/redux-form) The best way to manage your form state in Redux.
* [react-bootstrap](http://react-bootstrap.github.io/) The most popular front-end framework, rebuilt for React.

Get it running
--------------

Clone the repo and install the necessary node modules:

```shell
$ git clone https://github.com/lecstor/react-startup-starter.git my-new-startup
$ cd my-new-startup
$ npm install
$ npm run test:once
$ npm start
$ open http://localhost:3000
```

Position the debug dev tools with ctrl-q
Hide/Show the debug dev tools with ctrl-h


Usage
-----

command               | function
----------------------|--------------------------------------------------------------------
`npm start`           | start the dev_server with a development build
`npm run start:prod`  | start the dev_server with a production build
`npm run build`       | save a production build to the dist directory
`npm run build:dev`   | save a development build to the dist directory
`npm run build:stats` | Generate build stats which you can upload to the webpack [analyse tool](https://webpack.github.io/docs/build-performance.html) (see [Webpack Build Performance](https://webpack.github.io/docs/build-performance.html))
`npm test`            | run all tests continuously with Karma in a browser (chrome by default)
`npm run test:once`   | run all tests once with Karma in a browser (chrome by default)

Configuration
-------------

Configuration files are loaded using [node-config](https://github.com/lorenwest/node-config)

For the low-down on file naming, load order, and more see [Configuration-Files](https://github.com/lorenwest/node-config/wiki/Configuration-Files)

* `server_host` - hostname for the express server
* `server_port` - port for the express server
* `webpack_config_file` - the webpack config file to use to build the app

Ethos
-----

- code is read more than it is written, prefer clear over consise or compact
- comments in code should describe why, not how, the code will do that
- you shouldn't have to grep your code to find the functions it's using
- tests should be DAMP, not DRY

Recommended Reading
-------------------

* [Redux Documentation](http://rackt.org/redux/index.html)
* [Getting Started with Redux (Dan Abramov)](https://egghead.io/series/getting-started-with-redux)
* [5 Questions Every Unit Test Must Answer (Eric Elliot)](https://medium.com/javascript-scene/what-every-unit-test-needs-f6cd34d9836d)
* [The Two Pillars of JavaScript (Eric Elliot)](https://medium.com/javascript-scene/the-two-pillars-of-javascript-ee6f3281e7f3)
* [Redux best practices (Will Becker)](https://medium.com/lexical-labs-engineering/redux-best-practices-64d59775802e#.fkc9pmmyz)