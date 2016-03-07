import { pushPath } from 'redux-simple-router';

import waiter from '../store/waiter';
import { load as loadUser, isLoaded as userIsLoaded } from '../store/modules/user';
import { load as loadApiKeys } from '../store/modules/apikeys';

import SignupScreen from '../screens/signup';

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
        if (!userIsLoaded(store.getState())) store.dispatch(loadUser());
      },
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
      onEnter (nextState, replaceState, callback) {
        // by using the onEnter callback the route will wait until we are ready before continuing
        // instead of calling the callback, we can redirect to another route if required.

        // attempt to load the user if we haven't already
        if (!userIsLoaded(store.getState())) store.dispatch(loadUser());

        const toLogin = () => store.dispatch(pushPath('/login'));
        // wait while user.loading then user.data.id ? callback : dispatch pushPath('/login')
        waiter(store, 'user.loading', 'user.data.id', callback, toLogin);
      },
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
          onEnter () {
            store.dispatch(loadApiKeys());
          },
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
});

module.exports = getRoutes;
