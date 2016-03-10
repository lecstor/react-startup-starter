import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import rootReducer from '../store/reducers';

import { persistState } from 'redux-devtools';
import { DevTools } from '../containers/root.dev';

import createSagaMiddleware from 'redux-saga';
import sagasRoot from '../sagas';

const reduxRouter = routerMiddleware(browserHistory);
const sagas = createSagaMiddleware(sagasRoot);

const finalCreateStore = compose(
  applyMiddleware(reduxRouter, sagas),
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
