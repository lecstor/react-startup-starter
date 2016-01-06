import fetch from '../customFetch';

/**
 * handles async actions
 * @param   {function} options.dispatch  the redux dispatch function
 * @param   {function} options.getState  the redux getState function
 * @returns {[type]}                  [description]
 *
 * If the action is a function it will be called with dispatch and getState as args and the
 * result wil be returned.
 *
 * If the action has a promise property it is then also expected to have three action types.
 * The value of the promise property is a function which returns a promise.
 * The first action type is dispatched first, then the promise function is called.
 * If the promise resolves then the second action type is dispatched with the result.
 * If the promise rejects or one of the promise handlers fails, then the third action type
 * is dispatched with the error.
 *
 * Promise actions may also have onSuccess, onFail, or onRequestFail properties for functions
 * to be called after the action has completed. The function will be called with an object
 * containing the dispatch and getState functions.
 */
export default function hyperActions ({ dispatch, getState }) {
  return next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    const { promise, types, onSuccess, onFail, onRequestFail, ...rest } = action;
    if (!promise) {
      return next(action);
    }

    const [REQUEST, SUCCESS, FAILURE, REQUEST_FAILURE] = types;
    next({ ...rest, type: REQUEST });
    return promise(fetch).then(
      (response) => {
        if (response.error) {
          next({ ...rest, error: response.error, type: FAILURE });
          if (onFail) onFail({ dispatch, getState });
        } else {
          next({ ...rest, result: response.result, type: SUCCESS });
          if (onSuccess) onSuccess({ dispatch, getState });
        }
      },
      (error) => {
        next({ ...rest, error, type: REQUEST_FAILURE });
        if (onRequestFail) onRequestFail(dispatch);
      }
    ).catch((error) => {
      console.error('MIDDLEWARE ERROR:', error);
      next({ ...rest, error, type: REQUEST_FAILURE });
      if (onRequestFail) onRequestFail({ dispatch, getState });
    });
  };
}
