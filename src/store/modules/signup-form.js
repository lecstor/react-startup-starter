const SET_EMAIL = 'rss/signup-form/SET_EMAIL';

const initialState = { email: '' };

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {

    case SET_EMAIL:
      return { ...state, email: action.result };

    default:
      return state;
  }
}

export function setEmail (email) {
  return { type: SET_EMAIL, result: email };
}

