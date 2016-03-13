/* eslint-disable no-constant-condition */

import { fork, put, take } from 'redux-saga/effects';
import { watchAPIKeys } from './apikeys';
import { watchUser } from './user';

import { LOAD as LOAD_USER, LOGOUT as LOGOUT_USER } from '../store/modules/user';

function* handleSessionExpired () {
  while (true) {
    const action = yield take();
    if (action.error && action.error === 'Forbidden') {
      yield put({ type: LOGOUT_USER });
    }
  }
}

export default function* root () {
  yield [
    put({ type: LOAD_USER }),
    fork(watchAPIKeys),
    fork(watchUser),
    fork(handleSessionExpired),
  ];
}
