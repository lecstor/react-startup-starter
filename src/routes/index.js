
import SignupScreen from '../screens/signup';

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
        require.ensure([], require => cb(null, require('../containers/layout-site').default));
      },
      indexRoute: {
        getComponent (location, cb) {
          require.ensure([], require => cb(null, require('../screens/index').default));
        },
      },
      childRoutes: [
        {
          path: 'login(/from**)',
          getComponent (location, cb) {
            require.ensure([], require => cb(null, require('../screens/login').default));
          },
        },
        { path: 'signup', component: SignupScreen },
        {
          path: 'logout',
          getComponent (location, cb) {
            require.ensure([], require => cb(null, require('../containers/logout').default));
          },
        },
      ],
    },
    {
      path: '/app',
      getComponent (location, cb) {
        require.ensure([], require => cb(null, require('../containers/layout-app').default));
      },
      indexRoute: {
        getComponent (location, cb) {
          require.ensure([], require => cb(null, require('../screens/app/index').default));
        },
      },
      childRoutes: [
        {
          path: 'apikeys',
          getComponent (location, cb) {
            require.ensure([], require => cb(null, require('../containers/app/apikeys').default));
          },
        },
        {
          path: 'user',
          getComponent (location, cb) {
            require.ensure([], require => cb(null, require('../screens/app/user').default));
          },
        },
      ],
    },
  ],
};

module.exports = routes;
