import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import counter from './components/counter/action-reducers';
// import topnav from './components/top-nav/reducers';

export function createReducer (initialState, fnMap) {
  return (state = initialState, { type, payload } = {}) => {
    const handler = fnMap[type];
    return handler ? handler(state, payload) : state;
  };
}

export default combineReducers({
  counter,
  routing: routeReducer,
});
