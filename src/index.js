import React from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { syncReduxAndRouter } from 'redux-simple-router';
import Root from './containers/root';
import configureStore from './store';

const history = createBrowserHistory();
const store = configureStore(window.__INITIAL_STATE__);

// Connect the Redux store to the app router and keep them in sync
syncReduxAndRouter(history, store);

// The Root component is a container component (src/containers) which will get
// a child component according to the current browser location and the routes
// (src/routes) that have been defined.
const node = (
  <Root history={history} store={store} />
);

// render the app to the html element with the id "root".
ReactDOM.render(node, document.getElementById('root'));
