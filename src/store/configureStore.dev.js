import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import { persistState } from 'redux-devtools';

import rootReducer from '../store/reducers';
import { DevTools } from '../containers/root.dev';
import hyperActions from './middleware/hyperActions';

import createSagaMiddleware from 'redux-saga';
// import rootSaga from '../sagas';
// import { watchAPIKeys } from '../sagas';
import sagasRoot from '../sagas';

const routerMiddle = routerMiddleware(browserHistory);

const finalCreateStore = compose(
  applyMiddleware(hyperActions, routerMiddle, createSagaMiddleware(sagasRoot)),
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
