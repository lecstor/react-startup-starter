import 'isomorphic-fetch';

/**
 * convert response to payload
 * @param   {Object} response  the request response
 * @returns {Object} payload   the request payload
 * @returns {Object} payload.ok
 * @returns {Object} payload.data
 * @returns {Object} payload.data.status
 * @returns {Object} payload.data.statusText
 * @returns {Object} payload.data.message
 */

function responseToPayload (response) {
  // require a json body except for server errors or no content required (204)
  const requireBody = response.status >= 200 && response.status < 500 && response.status !== 204;
  const body = requireBody ? response.json() : Promise.resolve(undefined);
  return body.then(data => {
    if (response.ok) return { ok: true, data };
    const err = { ok: false, data: data || { message: response.statusText } };
    err.data.status = response.status;
    err.data.statusText = response.statusText;
    if (response.status >= 500) err.data.isServer = true;
    return err;
  });
}

export default function customFetch (url, options = {}) {
  const defaultOptions = {
    method: 'get',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    credentials: 'same-origin',
  };
  const fetchOptions = Object.assign(defaultOptions, options);
  return fetch(url, fetchOptions)
  .then(responseToPayload)
  .catch(error => ({
    ok: false,
    data: { message: error.message },
  }));
}
