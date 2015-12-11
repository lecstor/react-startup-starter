
// By using global constants and dynamic require we avoid including
// Redux DevTools code in production builds.

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./root.prod');
} else {
  module.exports = require('./root.dev');
}
