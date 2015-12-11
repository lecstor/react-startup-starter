import { createReducer } from '../../reducers';
import { COUNTER_INCREMENT } from './action-types';

const initialState = 0;
export default createReducer(initialState, {
  [COUNTER_INCREMENT]: (state) => state + 1,
});
