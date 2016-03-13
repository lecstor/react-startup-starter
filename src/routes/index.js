
// Code splitting is controlled via our routes.
//
// By dynamically requiring our route components we're telling webpack to separate
// our app into chunks that will be downloaded on-demand.
//
// Dynamic Routes (React-Router) https://github.com/rackt/react-router/blob/latest/docs/guides/advanced/DynamicRouting.md

const routes = {
  component: 'div',
  childRoutes: [
    {
      path: '/',
      getComponent (location, cb) {
        require.ensure([], require => cb(null, require('../containers/layout-default').default));
      },
      indexRoute: {
        getComponent (location, cb) {
          require.ensure([], require => cb(null, require('../components/index').default));
        },
      },
      childRoutes: [
        {
          path: 'login',
          getComponent (location, cb) {
            require.ensure([], require => cb(null, require('../components/login/').default));
          },
        },
        {
          path: 'apikeys',
          getComponent (location, cb) {
            require.ensure([], require => cb(null, require('../containers/api-keys').default));
          },
          indexRoute: {
            getComponent (location, cb) {
              require.ensure([], require => cb(null, require('../components/api-keys/').default));
            },
          },
        },
        {
          path: 'user-details',
          getComponent (location, cb) {
            require.ensure([], require => cb(null, require('../components/user-details').default));
          },
        },
      ],
    },
  ],
};

module.exports = routes;
