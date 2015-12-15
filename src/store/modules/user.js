
const LOGIN = 'rss/user/LOGIN';

const initialState = null;

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN:
      if (!action.result) return state;
      return Object.assign({}, action.result);
    default:
      return state;
  }
}

export const login = (user) => ({ type: LOGIN, result: user });
