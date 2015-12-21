const SET_EMAIL = 'rss/login-form/SET_EMAIL';
const SET_PASSWORD = 'rss/login-form/SET_PASSWORD';

const initialState = { email: '', password: '' };

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {

    case SET_EMAIL:
      return { ...state, email: action.result };

    case SET_PASSWORD:
      return { ...state, password: action.result };

    default:
      return state;
  }
}

export function setEmail (email) {
  return { type: SET_EMAIL, result: email };
}

export function setPassword (password) {
  return { type: SET_PASSWORD, result: password };
}

