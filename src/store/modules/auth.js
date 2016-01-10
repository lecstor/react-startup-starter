import { pushPath } from 'redux-simple-router';

// https://github.com/rackt/redux/issues/99
// https://github.com/erikras/react-redux-universal-hot-example/blob/master/src/redux/middleware/clientMiddleware.js
const LOAD = 'rss/auth/LOAD';
const LOAD_SUCCESS = 'rss/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'rss/auth/LOAD_FAIL';
const SIGNUP = 'rss/auth/SIGNUP';
const SIGNUP_SUCCESS = 'rss/auth/SIGNUP_SUCCESS';
const SIGNUP_FAIL = 'rss/auth/SIGNUP_FAIL';
const LOGIN = 'rss/auth/LOGIN';
const LOGIN_SUCCESS = 'rss/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'rss/auth/LOGIN_FAIL';
const LOGOUT = 'rss/auth/LOGOUT';
const LOGOUT_SUCCESS = 'rss/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'rss/auth/LOGOUT_FAIL';

const initialState = {
  loaded: false,
  loadDone: false,
  user: null,
};

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {

    case LOAD:
      return { ...state, loading: true };
    case LOAD_SUCCESS:
      return { ...state, loading: false, user: action.result };
    case LOAD_FAIL:
      return { ...state, loading: false, error: action.error };

    case SIGNUP:
      return { ...state, signingUp: true, error: undefined };
    case SIGNUP_SUCCESS:
      return { ...state, signingUp: false, error: undefined, user: action.result };
    case SIGNUP_FAIL:
      return { ...state, signingUp: false, error: action.error };

    case LOGIN:
      return { ...state, loggingIn: true, error: undefined };
    case LOGIN_SUCCESS:
      return { ...state, loggingIn: false, error: undefined, user: action.result };
    case LOGIN_FAIL:
      return { ...state, loggingIn: false, error: action.error };

    case LOGOUT:
      return { ...state, loggingOut: true };
    case LOGOUT_SUCCESS:
      return { ...state, loggingOut: false, user: null };
    case LOGOUT_FAIL:
      return { ...state, loggingOut: false, error: action.error };

    default:
      return state;
  }
}

export function isLoaded (globalState) {
  return globalState.auth && globalState.auth.loaded;
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
    promise: (fetch) => fetch('/auth'),
  };
}

export function signup (creds) {
  return {
    types: [SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAIL],
    promise: fetch => fetch('/auth/signup', { method: 'post', body: JSON.stringify(creds) }),
  };
}

export function login (creds, sourcePath) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: fetch => fetch('/auth/login', { method: 'post', body: JSON.stringify(creds) }),
    onSuccess: ({ dispatch }) => redirectToApp(dispatch, sourcePath),
  };
}

export function logout () {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (fetch) => fetch('/auth', { method: 'delete' }),
    onSuccess: ({ dispatch }) => dispatch(pushPath('/')),
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
 * dispatching this action will set state.auth.user to the user details object
 */
export function loginSuccess (user) {
  return { type: LOGIN_SUCCESS, result: user };
}

export function loginFail (error) {
  return { type: LOGIN_FAIL, error };
}
