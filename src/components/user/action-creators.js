import { USER_LOGIN } from './action-types';

export default {
  login: (user) => ({ type: USER_LOGIN, payload: user }),
};
