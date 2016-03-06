React Startup Starter
=====================

### Achievements

* Code-splitting - uses React Router dynamic routes and Webpack to split the code into "chunks" which are loaded by the client on demand minimising the initial download required.
* Login, logout, user details, and API keys UI all working through Redux and a self-contained development server.
* Redux "stash" module for storing form data, UI state, and more so view changes don't lose input.
* Gracefully handles session expiry displaying login if a background request returns 403. (delete the my_session cookie while editing API keys to test)

### Giant Shoulders

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
* [react-bootstrap](http://react-bootstrap.github.io/) The most popular front-end framework, rebuilt for React.
* [redux-devtools-log-monitor](https://github.com/gaearon/redux-devtools-log-monitor) The default monitor for Redux DevTools with a tree view.
* [redux-devtools-inspector](https://github.com/alexkuz/redux-devtools-inspector) A state monitor for Redux DevTools that provides a convenient way to inspect "real world" app states that could be complicated and deeply nested.

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

- Position the debug dev tools with ctrl-q
- Hide/Show the debug dev tools with ctrl-h
- Change DevTools Monitor with ctrl-m


Usage
-----

`npm start` - start the dev_server with a development build

`npm run start:prod` - start the dev_server with a production build

`npm run build` - save a production build to the dist directory

`npm run build:dev` - save a development build to the dist directory

`npm run build:stats` - Generate build stats which you can upload to the webpack [analyse tool](https://webpack.github.io/docs/build-performance.html) (see [Webpack Build Performance](https://webpack.github.io/docs/build-performance.html))

`npm test` - run all tests continuously with Karma in a browser (chrome by default)

`npm run test:once` - run all tests once with Karma in a browser (chrome by default)

Configuration
-------------

Configuration files are loaded using [node-config](https://github.com/lorenwest/node-config)

For the low-down on file naming, load order, and more see [Configuration-Files](https://github.com/lorenwest/node-config/wiki/Configuration-Files)

* `server_host` - hostname for the express server
* `server_port` - port for the express server
* `webpack_config_file` - the webpack config file to use to build the app

File Structure
--------------
```
.
├── config/                     # configuration files
├── coverage/                   # code coverage reports for tests
├── dev_server/                 # Express based development server
├── dist/                       # app distribution builds
├── src/                        # use the source
│   ├── components/             # "dumb" or "pure function" components
│   ├── containers/             # composable "smart" components (mostly those connected to Redux)
│   ├── routes/                 # React Router route definitions
│   ├── screens/                # the components the routes will load (one per page/view/screen)
│   ├── store/                  # the redux store
│   │   ├── middleware/         # reducer middlware
│   │   │   └── hyperActions.js # function & promise handling for the store
│   │   ├── modules/            # actions and reducers
│   │   │   └── stash.js        # generic stash for storing form input values and others
│   │   ├── configureStore.*.js # create the store with middleware and reducers
│   │   ├── customFetch.js      # light wrapper around isomorphic-fetch
│   │   ├── reducers.js         # combine the reducers for configureStore
│   │   └── waiter.js           # call a function once when state changes
│   └── index.js                # the root component loaded with history and a redux store
├── webpack/                    # webpack config for production, development, and tests (not really)
└── karma.conf                  # Karma config for tests (inc webpack config)
```

File Loading
------------
```
src/index.js
├── src/containers/root.js                    # the root component loaded with history and a redux store
│   └── src/routes/index.js                   # React Router route definitions
│       ├── src/store/waiter.js               # call a function once when state changes
│       ├── src/containers/layout-*.js        # define everything in a screen except the main content
│       └── src/screens/*                     # define a page/view/screen
│           ├── src/containers/*.js           # composable "smart" components (mostly those connected to Redux)
│           └── src/components/*.js           # "dumb" or "pure function" components - may include other components
└── src/store/configureStore.*.js             # create the store with middleware and reducers
    ├── src/store/reducers.js                 # loads all reducers and combines them into one
    │   └── src/store/modules/*               # definitions of actions and reducers
    └── src/store/middleware/hyperActions.js  # call action functions and promises and handle results by dispatching actions
        └── src/store/customFetch.js          # make server requests
```

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