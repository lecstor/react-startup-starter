import { pushPath } from 'redux-simple-router';

// https://github.com/rackt/redux/issues/99
// https://github.com/erikras/react-redux-universal-hot-example/blob/master/src/redux/middleware/clientMiddleware.js
const LOAD = 'rss/user/LOAD';
const LOAD_SUCCESS = 'rss/user/LOAD_SUCCESS';
const LOAD_FAIL = 'rss/user/LOAD_FAIL';
const SIGNUP = 'rss/user/SIGNUP';
const SIGNUP_SUCCESS = 'rss/user/SIGNUP_SUCCESS';
const SIGNUP_FAIL = 'rss/user/SIGNUP_FAIL';
const LOGIN = 'rss/user/LOGIN';
const LOGIN_SUCCESS = 'rss/user/LOGIN_SUCCESS';
const LOGIN_FAIL = 'rss/user/LOGIN_FAIL';
const LOGOUT = 'rss/user/LOGOUT';
const LOGOUT_SUCCESS = 'rss/user/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'rss/user/LOGOUT_FAIL';
const UPDATE = 'rss/user/UPDATE';
const UPDATE_SUCCESS = 'rss/user/UPDATE_SUCCESS';
const UPDATE_FAIL = 'rss/user/UPDATE_FAIL';

const initialState = {
  loaded: false,
  data: undefined,
};

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {

    case LOAD:
      return { ...state, loading: true };
    case LOAD_SUCCESS:
      return { ...state, loading: false, data: action.result };
    case LOAD_FAIL:
      return { ...state, loading: false, error: action.error };

    case SIGNUP:
      return { ...state, signingUp: true, error: undefined };
    case SIGNUP_SUCCESS:
      return { ...state, signingUp: false, error: undefined, data: action.result };
    case SIGNUP_FAIL:
      return { ...state, signingUp: false, error: action.error };

    case LOGIN:
      return { ...state, loggingIn: true, error: undefined };
    case LOGIN_SUCCESS:
      return { ...state, loggingIn: false, error: undefined, data: action.result.user };
    case LOGIN_FAIL:
      return { ...state, loggingIn: false, error: action.error, data: undefined };

    case LOGOUT:
      return { ...state, loggingOut: true };
    case LOGOUT_SUCCESS:
      return { ...state, loggingOut: false, data: null };
    case LOGOUT_FAIL:
      return { ...state, loggingOut: false, error: action.error };

    case UPDATE:
      return { ...state, loading: true };
    case UPDATE_SUCCESS:
      return { ...state, loading: false, data: action.result };
    case UPDATE_FAIL:
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
}

export function isLoaded (globalState) {
  return globalState.user && globalState.user.data !== undefined;
}

export function redirectToApp (dispatch, path = '/app') {
  const redirectTo = /^\/app/.test(path) ? path : '/app';
  dispatch(pushPath(redirectTo));
}

/**
 * The load, login, and logout functions return actions that will be intercepted by the redux
 * middleware in store/middleware/hyperActions.js which will dispatch the first action type,
 * call the promise function, and then dispatch one of the remaining action types depending on
 * the result of the promise function.
 */

export function load () {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (fetch) => fetch('/user'),
  };
}

export function signup (creds) {
  return {
    types: [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAIL],
    promise: fetch => fetch('/user', { method: 'post', body: JSON.stringify(creds) }),
    onSuccess: ({ dispatch }) => redirectToApp(dispatch),
  };
}

export function login (creds, sourcePath) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: fetch => fetch('/session', { method: 'post', body: JSON.stringify(creds) }),
    onSuccess: ({ dispatch }) => redirectToApp(dispatch, sourcePath),
  };
}

export function logout () {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (fetch) => fetch('/session', { method: 'delete' }),
    onSuccess: ({ dispatch }) => dispatch(pushPath('/')),
  };
}

export function update (data) {
  return {
    types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAIL],
    promise: fetch => fetch('/user', { method: 'put', body: JSON.stringify(data) }),
  };
}


export function loginSubmit () {
  return { type: LOGIN };
}

/**
 * returns a login success action
 * @param   {Object} user        user details
 * @param   {String} user.id     user's id
 * @param   {String} user.name   user's name
 * @param   {String} user.email  user's email address
 * @returns {Object}             action with user details as the result
 *
 * dispatching this action will set state.user.data to the user details object
 */
export function loginSuccess (user) {
  return { type: LOGIN_SUCCESS, result: user };
}

export function loginFail (error) {
  return { type: LOGIN_FAIL, error };
}
