import findIndex from 'lodash/findIndex';

const ns = (action) => `rss/apikeys/${action}`;

export const LOAD = ns('LOAD');
export const LOAD_SUCCESS = ns('LOAD_SUCCESS');
export const LOAD_FAIL = ns('LOAD_FAIL');

export const CREATE = ns('CREATE');
export const CREATE_SUCCESS = ns('CREATE_SUCCESS');
export const CREATE_FAIL = ns('CREATE_FAIL');

export const UPDATE = ns('UPDATE');
export const UPDATE_SUCCESS = ns('UPDATE_SUCCESS');
export const UPDATE_FAIL = ns('UPDATE_FAIL');

export const DELETE = ns('DELETE');
export const DELETE_SUCCESS = ns('DELETE_SUCCESS');
export const DELETE_FAIL = ns('DELETE_FAIL');

const initialState = { loaded: false, data: [] };

export default function reducer (state = initialState, action = {}) {
  const newState = { ...state, error: undefined, saga: action.saga };

  switch (action.type) {

    case LOAD:
      return { ...newState, loading: true };

    case LOAD_SUCCESS:
      return { ...newState, loading: false, loaded: true, data: action.payload };

    case LOAD_FAIL:
      return { ...newState, loading: false, fail: action.error, error: action.payload };


    case CREATE:
      return { ...newState, loading: true };

    case CREATE_SUCCESS: {
      const data = [action.payload, ...newState.data];
      return { ...newState, loading: false, data };
    }

    case CREATE_FAIL:
      return { ...newState, loading: false, fail: action.error, error: action.payload };


    case UPDATE:
      return { ...newState, loading: true };

    case UPDATE_SUCCESS: {
      const updateIdx = findIndex(state.data, { id: action.payload.id });
      if (updateIdx < 0) return { ...newState, loading: false };
      return {
        ...newState,
        loading: false,
        data: [
          ...newState.data.slice(0, updateIdx),
          action.payload,
          ...newState.data.slice(updateIdx + 1),
        ],
      };
    }

    case UPDATE_FAIL:
      return { ...newState, loading: false, fail: action.error, error: action.payload };


    case DELETE:
      return { ...newState, loading: true };

    case DELETE_SUCCESS: {
      const deleteIdx = findIndex(state.data, { id: action.payload.id });
      if (deleteIdx < 0) return { ...newState, loading: false };
      return {
        ...newState,
        loading: false,
        data: [
          ...newState.data.slice(0, deleteIdx),
          ...newState.data.slice(deleteIdx + 1),
        ],
      };
    }

    case DELETE_FAIL:
      return { ...newState, loading: false, fail: action.error, error: action.payload };

    default:
      return state;
  }
}

/**
 * returns an action which can be used to load existing keys
 * @returns {Object} action
 * @returns {Object} action.type     the load action type
 */
export function load () {
  return { type: LOAD };
}

/**
 * returns an action which can be used to create a new key
 * @param   {Object}  key
 * @param   {String}  key.label  a label for the new key
 * @param   {Boolean} [key.test]   set to true to create a test key
 * @returns {Object} action
 * @returns {Object} action.type     the create action type
 * @returns {Object} action.payload  the provided key
 */
export function createKey (key) {
  return { type: CREATE, payload: key };
}

/**
 * returns an action which can be used to update an existing key
 * @param   {Object} key
 * @param   {String} key.id     the id of the key to be updated
 * @param   {String} key.label  a new label for the key
 * @returns {Object} action
 * @returns {Object} action.type     the update action type
 * @returns {Object} action.payload  the provided key
 */
export function updateKey (key) {
  return { type: UPDATE, payload: key };
}

/**
 * returns an action which can be used to delete an existing key
 * @param   {Object} key
 * @param   {String} key.id     the id of the key to be updated
 * @returns {Object} action
 * @returns {Object} action.type     the delete action type
 * @returns {Object} action.payload  the provided key
 */
export function deleteKey (key) {
  return { type: DELETE, payload: key };
}
