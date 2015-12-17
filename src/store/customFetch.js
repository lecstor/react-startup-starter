import isoFetch from 'isomorphic-fetch';
import Promise from 'bluebird';

// To have fetch Promise reject on HTTP error statuses, i.e. on any non-2xx status, define a custom response handler
function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function parseJSON (response) {
  return response.json();
}

export default function fetch (url, options = {}) {
  const defaultOptions = {
    method: 'get',
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    credentials: 'same-origin',
  };
  const fetchOptions = Object.assign(defaultOptions, options);
  return isoFetch(url, fetchOptions)
  .then(checkStatus)
  .then(parseJSON)
  .then(
    res => {
      if (res.ok) return res.payload;
      const error = new Error(res.error);
      error.details = res.payload;
      return Promise.reject(error);
    }
  );
}
