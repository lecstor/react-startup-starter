import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import { persistState } from 'redux-devtools';

import rootReducer from '../store/reducers';
import { DevTools } from '../containers/root.dev';
import hyperActions from './middleware/hyperActions';

const routerMiddle = routerMiddleware(browserHistory);

const finalCreateStore = compose(
  applyMiddleware(hyperActions, routerMiddle),
  DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&]+)\b/
    )
  )
)(createStore);

export default function configureStore (initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('../store/reducers', () =>
      store.replaceReducer(require('../store/reducers'))
    );
  }

  return store;
}
