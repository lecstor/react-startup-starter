import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../store/reducers';

import hyperActions from './middleware/hyperActions';

const finalCreateStore = compose(
  applyMiddleware(hyperActions)
)(createStore);

export default function configureStore (initialState) {
  return finalCreateStore(rootReducer, initialState);
}
