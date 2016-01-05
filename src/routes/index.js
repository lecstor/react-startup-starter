import SignupView from '../containers/signup-view';

// Code splitting is controlled via our routes.
//
// By dynamically requiring our route components we're telling webpack to separate
// our app into chunks that will be downloaded on-demand.
//
// Dynamic Routes (React-Router) https://github.com/rackt/react-router/blob/latest/docs/guides/advanced/DynamicRouting.md

const rootRoute = {
  component: 'div',
  childRoutes: [
    {
      path: '/',
      getComponent (location, cb) {
        require.ensure([], require => cb(null, require('../containers/app-layout').default));
      },
      indexRoute: {
        getComponent (location, cb) {
          require.ensure([], require => cb(null, require('../containers/home-view').default));
        },
      },
      childRoutes: [
        {
          path: 'login',
          getComponent (location, cb) {
            require.ensure([], require => cb(null, require('../containers/login-view').default));
          },
        },
        { path: 'signup', component: SignupView },
        {
          path: 'about',
          getComponent (location, cb) {
            require.ensure([], require => cb(null, require('../containers/about-view').default));
          },
        },
        {
          path: 'logout',
          getComponent (location, cb) {
            require.ensure([], require => cb(null, require('../containers/logout-view').default));
          },
        },
        {
          path: 'app',
          getComponent (location, cb) {
            require.ensure([], require => cb(null, require('../containers/app-view').default));
          },
        },
      ],
    },
    {
      path: '/alt',
      getComponent (location, cb) {
        require.ensure([], require => cb(null, require('../containers/alt-layout').default));
      },
      indexRoute: {
        getComponent (location, cb) {
          require.ensure([], require => cb(null, require('../containers/alt-home-view').default));
        },
      },
      childRoutes: [
        { path: 'signup', component: SignupView },
      ],
    },
  ],
};

module.exports = rootRoute;
