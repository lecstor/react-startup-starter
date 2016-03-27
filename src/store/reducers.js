import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import stash from '../store/modules/stash';
import user, { LOGOUT as LOGOUT_USER } from '../store/modules/user';
import apikeys from '../store/modules/apikeys';
import menu from '../store/modules/menu';

export function createReducer (initialState, fnMap) {
  return (state = initialState, { type, payload } = {}) => {
    const handler = fnMap[type];
    return handler ? handler(state, payload) : state;
  };
}

const appReducer = combineReducers({
  routing,
  stash,
  apikeys,
  menu,
  user,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_USER) {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;

// dynamic reducers for code splitting

// https://github.com/rackt/redux/issues/350
// http://stackoverflow.com/questions/32968016/how-to-dynamically-load-reducers-for-code-splitting-in-a-redux-application

// reducers/index.js

// import { combineReducers } from 'redux';
//
// // reducers
// function users() { }
// function posts() { }
//
// let asyncReducers = {};
// export function registerAsyncReducers(newAsyncReducers) {
//   asyncReducers = { ...asyncReducers, ...newAsyncReducers };
// }
//
// export default function createReducer() {
//   return combineReducers({
//     users,
//     posts,
//     ...asyncReducers
//   });
// }


// index.js

// import { createStore } from 'redux';
// import createReducer from './reducers';
//
// const store = createStore(createReducer());


// async-entry-point.js

// import createReducer, { registerAsyncReducers } from './reducers';
//
// // additional reducers
// function messages() { }
// function dashboard() { }
//
// // side effect: register them
// registerAsyncReducers({ messages, dashboard });
//
// // somehow obtain reference to a store
// // (e.g. import a singleton, or grab it from this.context.store in React component)
// const store = /* ... */;
//
// // this will initialize the relevant state & incorporate the reducer
// store.replaceReducer(createReducer());
