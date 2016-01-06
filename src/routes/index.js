import { pushPath } from 'redux-simple-router';

import SignupView from '../containers/signup';

// Code splitting is controlled via our routes.
//
// By dynamically requiring our route components we're telling webpack to separate
// our app into chunks that will be downloaded on-demand.
//
// Dynamic Routes (React-Router) https://github.com/rackt/react-router/blob/latest/docs/guides/advanced/DynamicRouting.md

const getRoutes = (store) => ({
  component: 'div',
  childRoutes: [
    {
      path: '/',
      getComponent (location, cb) {
        require.ensure([], require => cb(null, require('../containers/layout-site').default));
      },
      indexRoute: {
        getComponent (location, cb) {
          require.ensure([], require => cb(null, require('../containers/index-site').default));
        },
      },
      childRoutes: [
        {
          path: 'login',
          getComponent (location, cb) {
            require.ensure([], require => cb(null, require('../containers/login').default));
          },
        },
        { path: 'signup', component: SignupView },
        {
          path: 'about',
          getComponent (location, cb) {
            require.ensure([], require => cb(null, require('../containers/about').default));
          },
        },
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
      onEnter () {
        if (!store.getState().auth.loaded) {
          store.dispatch(pushPath('/login'));
        }
      },
      getComponent (location, cb) {
        require.ensure([], require => cb(null, require('../containers/layout-app').default));
      },
      indexRoute: {
        getComponent (location, cb) {
          require.ensure([], require => cb(null, require('../containers/index-app').default));
        },
      },
      childRoutes: [
        { path: 'signup', component: SignupView },
      ],
    },
  ],
});

module.exports = getRoutes;
