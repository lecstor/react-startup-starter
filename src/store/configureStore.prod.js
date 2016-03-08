import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import rootReducer from '../store/reducers';

import hyperActions from './middleware/hyperActions';

const routerMiddle = routerMiddleware(browserHistory);

const finalCreateStore = compose(
  applyMiddleware(hyperActions, routerMiddle)
)(createStore);

export default function configureStore (initialState) {
  return finalCreateStore(rootReducer, initialState);
}
