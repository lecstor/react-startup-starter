import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';

import rootReducer from '../store/reducers';
import { DevTools } from '../containers/root.dev';
import hyperActions from './middleware/hyperActions';

const finalCreateStore = compose(
  applyMiddleware(hyperActions),
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
