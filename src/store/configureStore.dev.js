import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import rootReducer from '../store/reducers';
import DevTools from '../containers/dev-tools';

import fetchMiddleware from './middleware/fetchMiddleware';

const finalCreateStore = compose(
  applyMiddleware(fetchMiddleware),
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
