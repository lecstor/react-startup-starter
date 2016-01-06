import get from 'lodash/object/get';

/**
 * wait on state then call a function
 * @param   {Object}   store         the redux store
 * @param   {String}   waitState     path to state property. While this property is true, we wait
 * @param   {String}   checkState    path to state property. When waitState is false we check this
 * @param   {Function} trueCallback  if checkState is true we'll call this
 * @param   {Function} falseCallback if checkState is false we'll call this
 *
 * This function is used to wait on a state change which is generally the result of an async action.
 */
export default function (store, waitState, checkState, trueCallback, falseCallback) {
  let state = store.getState();
  if (get(state, waitState)) {
    const unsubscribe = store.subscribe(() => {
      state = store.getState();
      if (get(state, checkState)) {
        unsubscribe();
        trueCallback();
      } else if (!get(state, waitState)) {
        unsubscribe();
        falseCallback();
      }
    });
  } else if (get(state, checkState)) {
    trueCallback();
  } else {
    falseCallback();
  }
}
