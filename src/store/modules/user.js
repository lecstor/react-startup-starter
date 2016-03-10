
export const LOAD = 'rss/user/LOAD';
export const LOAD_SUCCESS = 'rss/user/LOAD_SUCCESS';
export const LOAD_FAIL = 'rss/user/LOAD_FAIL';

export const SIGNUP = 'rss/user/SIGNUP';
export const SIGNUP_SUCCESS = 'rss/user/SIGNUP_SUCCESS';
export const SIGNUP_FAIL = 'rss/user/SIGNUP_FAIL';

export const LOGIN = 'rss/user/LOGIN';
export const LOGIN_SUCCESS = 'rss/user/LOGIN_SUCCESS';
export const LOGIN_FAIL = 'rss/user/LOGIN_FAIL';

export const LOGOUT = 'rss/user/LOGOUT';
export const LOGOUT_SUCCESS = 'rss/user/LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'rss/user/LOGOUT_FAIL';

export const UPDATE = 'rss/user/UPDATE';
export const UPDATE_SUCCESS = 'rss/user/UPDATE_SUCCESS';
export const UPDATE_FAIL = 'rss/user/UPDATE_FAIL';

const initialState = {};

export function isLoaded (globalState) {
  return globalState.user && globalState.user.data !== undefined;
}

export function load () {
  return { type: LOAD };
}

export function signup (userData) {
  return { type: SIGNUP, payload: userData };
}

export function login (creds, sourcePath) {
  return { type: LOGIN, payload: { creds, sourcePath } };
}

export function logout () {
  return { type: LOGOUT };
}

export function update (userData) {
  return { type: UPDATE, payload: userData };
}

export function loginSubmit () {
  return { type: LOGIN };
}


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
