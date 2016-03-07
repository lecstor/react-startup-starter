import 'isomorphic-fetch';

// Reject fetch Promise reject on HTTP error statuses
function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.status = response.status;
  throw error;
}

function parseJSON (response) {
  if (response.status === 204) return {};
  return response.json();
}

export default function customFetch (url, options = {}) {
  const defaultOptions = {
    method: 'get',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    credentials: 'same-origin',
  };
  const fetchOptions = Object.assign(defaultOptions, options);
  return fetch(url, fetchOptions)
  .then(checkStatus)
  .then(parseJSON);
}
