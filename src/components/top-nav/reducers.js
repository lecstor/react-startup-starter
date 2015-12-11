import { createReducer } from '../../reducers';
import { LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL } from './action-types';

const initialState = 0;
export default createReducer(initialState, {
  [LOGOUT]: (state) => { return state; },
  [LOGOUT_SUCCESS]: (state) => { return state; },
  [LOGOUT_FAIL]: (state) => { return state; },
});
