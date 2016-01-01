import AppLayout from '../layouts/app-layout';
import HomeView from '../views/home-view';
import LoginView from '../views/login-view';

// By dynamically requiring our route components we're telling webpack to separate
// our app into chuncks that will be downloaded on-demand.
//
// Dynamic Routes (React-Router) https://github.com/rackt/react-router/blob/latest/docs/guides/advanced/DynamicRouting.md

const rootRoute = {
  component: 'div',
  childRoutes: [
    {
      path: '/',
      component: AppLayout,
      indexRoute: { component: HomeView },
      childRoutes: [
        { path: '/login', component: LoginView },
        {
          path: 'signup',
          getComponent (location, cb) {
            require.ensure([], require => cb(null, require('../views/signup-view').default));
          },
        },
        {
          path: 'about',
          getComponent (location, cb) {
            require.ensure([], require => cb(null, require('../views/about-view').default));
          },
        },
        {
          path: 'logout',
          getComponent (location, cb) {
            require.ensure([], require => cb(null, require('../views/logout-view').default));
          },
        },
        {
          path: 'app',
          getComponent (location, cb) {
            require.ensure([], require => cb(null, require('../views/app-view').default));
          },
        },
      ],
    },
  ],
};

module.exports = rootRoute;
