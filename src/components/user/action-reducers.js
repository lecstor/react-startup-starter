import { createReducer } from '../../store/reducers';
import { USER_LOGIN } from './action-types';

const initialState = null;
export default createReducer(initialState, {
  [USER_LOGIN]: (state, user) => {
    if (!user) return initialState;
    return Object.assign({}, user);
  },
});
