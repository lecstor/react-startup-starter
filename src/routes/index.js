import { pushPath } from 'redux-simple-router';

import waiter from '../store/waiter';
import { load } from '../store/modules/auth';

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
      onEnter () {
        if (!store.getState().auth.loadDone) store.dispatch(load());
      },
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
      onEnter (nextState, replaceState, callback) {
        // by using the onEnter callback the route will wait until we are ready before continuing
        // instead of calling the callback, we can redirect to another route if required.

        // attempt to load the user if we haven't already
        if (!store.getState().auth.loadDone) store.dispatch(load());

        // wait while auth.loading then auth.loaded ? callback : dispatch pushPath('/login')
        waiter(store, 'auth.loading', 'auth.loaded', callback, () => store.dispatch(pushPath('/login')));
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
        {
          path: 'apikeys',
          getComponent (location, cb) {
            require.ensure([], require => cb(null, require('../containers/app/apikeys').default));
          },
        },
      ],
    },
  ],
});

module.exports = getRoutes;
