import pick from 'lodash/pick';

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

export function login (creds) {
  return { type: LOGIN, payload: { creds } };
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
  const newState = { ...state, error: undefined, saga: action.saga };

  switch (action.type) {

    case LOAD:
      return { ...newState, loading: true };
    case LOAD_SUCCESS:
      return { ...newState, loading: false, data: action.payload };
    case LOAD_FAIL:
      return { ...newState, loading: false, error: action.payload };

    case SIGNUP:
      return { ...newState, signingUp: true };
    case SIGNUP_SUCCESS:
      return { ...newState, signingUp: false, data: action.payload };
    case SIGNUP_FAIL:
      return { ...newState, signingUp: false, error: action.payload };

    case LOGIN:
      return { ...newState, loggingIn: true };
    case LOGIN_SUCCESS:
      return { ...newState, loggingIn: false, data: action.payload };
    case LOGIN_FAIL:
      return { ...newState, loggingIn: false, error: action.payload };

    case LOGOUT:
      return { ...newState, loggingOut: true };
    case LOGOUT_SUCCESS:
      return { ...newState, loggingOut: false, data: null };
    case LOGOUT_FAIL:
      return { ...newState, loggingOut: false, error: action.payload };

    case UPDATE:
      return { ...newState, loading: true };
    case UPDATE_SUCCESS:
      return { ...newState, loading: false, data: action.payload };
    case UPDATE_FAIL:
      return { ...newState, loading: false, error: action.payload };

    default:
      return state;
  }
}
