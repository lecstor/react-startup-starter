import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import rootReducer from '../store/reducers';

import createSagaMiddleware from 'redux-saga';
import sagasRoot from '../sagas';

const reduxRouter = routerMiddleware(browserHistory);
const sagas = createSagaMiddleware(sagasRoot);

const finalCreateStore = compose(
  applyMiddleware(reduxRouter, sagas)
)(createStore);

export default function configureStore (initialState) {
  return finalCreateStore(rootReducer, initialState);
}
