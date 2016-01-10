
const SET_VALUE = 'rss/stash/SET_VALUE';
const CLEAR_STASH = 'rss/stash/CLEAR_STASH';

const initialState = {};

export default function reducer (state = initialState, action = {}) {
  const { stash, key, value } = action.result || {};

  switch (action.type) {

    case SET_VALUE:
      return { ...state, [stash]: { ...state[stash], [key]: value } };

    case CLEAR_STASH:
      return { ...state, [stash]: {} };

    default:
      return state;
  }
}

/**
 * Clear the data from a stash. (sets the value of a stash to an empty object)
 * @param   {String} stash  the name of a stash
 * @returns {Object}        a Redux action
 */
export function clearStash (stash) {
  return { type: CLEAR_STASH, result: { stash } };
}

/**
 * Set a value in a stash from key/value args
 * @param   {String} stash  stash the name of a stash
 * @param   {String} key    the key of a record in the stash
 * @param   {Any}    value  the value to set
 * @returns {Object}        a Redux action
 */
export function setValue (stash, key, value) {
  return { type: SET_VALUE, result: { stash, key, value } };
}

/**
 * Create a function to set values in a stash from key/value args.
 * @param   {String}   stash  the name of a stash
 * @returns {Function}        takes key, value args and calls setValue on a stash
 */
export function createStashSetFn (stash) {
  return (key, value) => setValue(stash, key, value);
}

/**
 * Set a value in a stash from an event
 * @param   {String} stash  the name of a stash
 * @param   {Object} event  an object with target.name and target.value properties
 * @returns {Object}        a Redux action
 */
export function setValueFromEvent (stash, event) {
  const { name, value } = event.target;
  return { type: SET_VALUE, result: { stash, key: name, value } };
}

/**
 * Create a function to set values in a stash from events
 * @param   {String}   stash  the name of a stash
 * @returns {Function}        takes an event and calls setValueFromEvent on a stash
 */
export function createStashEventValueFn (stash) {
  return (event) => setValueFromEvent(stash, event);
}

