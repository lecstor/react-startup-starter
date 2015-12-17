// https://github.com/rackt/redux/issues/99
// https://github.com/erikras/react-redux-universal-hot-example/blob/master/src/redux/middleware/clientMiddleware.js
const LOAD = 'rss/auth/LOAD';
const LOAD_SUCCESS = 'rss/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'rss/auth/LOAD_FAIL';
const LOGIN = 'rss/auth/LOGIN';
const LOGIN_SUCCESS = 'rss/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'rss/auth/LOGIN_FAIL';
const LOGOUT = 'rss/auth/LOGOUT';
const LOGOUT_SUCCESS = 'rss/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'rss/auth/LOGOUT_FAIL';

const initialState = {
  loaded: false,
};

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {

    case LOAD:
      return { ...state, loading: true };
    case LOAD_SUCCESS:
      return { ...state, loading: false, loaded: true, user: action.result.user };
    case LOAD_FAIL:
      return { ...state, loading: false, loaded: false, error: action.error };

    case LOGIN:
      return { ...state, loggingIn: true };
    case LOGIN_SUCCESS:
      return { ...state, loggingIn: false, user: action.result };
    case LOGIN_FAIL:
      return { ...state, loggingIn: false, user: null, loginError: action.error };

    case LOGOUT:
      return { ...state, loggingOut: true };
    case LOGOUT_SUCCESS:
      return { ...state, loggingOut: false, user: null };
    case LOGOUT_FAIL:
      return { ...state, loggingOut: false, logoutError: action.error };

    default:
      return state;
  }
}

export function isLoaded (globalState) {
  return globalState.auth && globalState.auth.loaded;
}

/**
 * The load, login, and logout functions return actions that will be intercepted by the redux
 * middleware in store/middleware/fetchMiddleware.js which will dispatch the first action type,
 * call the promise function, and then dispatch one of the remaining action types depending on
 * the result of the promise function.
 */

export function load () {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/loadAuth'),
  };
}

export function login (creds) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: fetch => fetch('/auth/login', { method: 'post', body: JSON.stringify(creds) }),
  };
}

export function logout () {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => client.get('/logout'),
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

export function loginFail (result) {
  return { type: LOGIN_FAIL, result };
}
