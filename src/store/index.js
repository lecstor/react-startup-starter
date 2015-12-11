
// By using global constants and dynamic require we avoid including
// Redux DevTools code in production builds.

// https://github.com/gaearon/redux-devtools/tree/next/examples/counter/src/store

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./configureStore.prod');
} else {
  module.exports = require('./configureStore.dev');
}
