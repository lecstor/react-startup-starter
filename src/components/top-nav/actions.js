import { LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL } from './action-types';

export function logout () {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: (client) => client.get('/logout'),
  };
}
