
// By using global constants and dynamic require we avoid including
// Redux DevTools code in production builds.

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}
