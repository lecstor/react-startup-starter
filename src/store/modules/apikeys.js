const CREATE_KEY = 'rss/apikeys/CREATE_KEY';
const CREATE_KEY_SUCCESS = 'rss/apikeys/CREATE_KEY_SUCCESS';
const CREATE_KEY_FAIL = 'rss/apikeys/CREATE_KEY_FAIL';
const CREATE_KEY_REQUEST_FAIL = 'rss/apikeys/CREATE_KEY_REQUEST_FAIL';

const ACTIVATE_KEY = 'rss/apikeys/ACTIVATE_KEY';
const ACTIVATE_KEY_SUCCESS = 'rss/apikeys/ACTIVATE_KEY_SUCCESS';
const ACTIVATE_KEY_FAIL = 'rss/apikeys/ACTIVATE_KEY_FAIL';
const ACTIVATE_KEY_REQUEST_FAIL = 'rss/apikeys/ACTIVATE_KEY_REQUEST_FAIL';

const DELETE_KEY = 'rss/apikeys/DELETE_KEY';
const DELETE_KEY_SUCCESS = 'rss/apikeys/DELETE_KEY_SUCCESS';
const DELETE_KEY_FAIL = 'rss/apikeys/DELETE_KEY_FAIL';
const DELETE_KEY_REQUEST_FAIL = 'rss/apikeys/DELETE_KEY_REQUEST_FAIL';

const initialState = [];

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {

    case CREATE_KEY:
      return { ...state, loading: true };

    case CREATE_KEY_SUCCESS:
      return { ...state, loading: false, apikeys: action.result };

    case CREATE_KEY_FAIL:
      return { ...state, loading: false, error: undefined, createError: action.error };

    case CREATE_KEY_REQUEST_FAIL:
      return { ...state, loading: false, error: action.error, createError: undefined };

    default:
      return state;
  }
}

export function createKey () {
  return {
    types: [CREATE_KEY, CREATE_KEY_SUCCESS, CREATE_KEY_FAIL, CREATE_KEY_REQUEST_FAIL],
    promise: (fetch) => fetch('/apikeys', { method: 'post' }),
  };
}

export function updateKey (key) {
  return {
    types: [ACTIVATE_KEY, ACTIVATE_KEY_SUCCESS, ACTIVATE_KEY_FAIL, ACTIVATE_KEY_REQUEST_FAIL],
    promise: (fetch) => fetch(`/apikeys/${key.id}`, { method: 'put', body: JSON.stringify(key) }),
  };
}

export function deleteKey (key) {
  return {
    types: [DELETE_KEY, DELETE_KEY_SUCCESS, DELETE_KEY_FAIL, DELETE_KEY_REQUEST_FAIL],
    promise: (fetch) => fetch(`/apikeys/${key.id}`, { method: 'delete' }),
  };
}
