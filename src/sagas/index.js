import { fork, put } from 'redux-saga/effects';
import { watchAPIKeys } from './apikeys';
import { watchUser } from './user';

import { LOAD as LOAD_USER } from '../store/modules/user';

export default function* root () {
  yield [
    put({ type: LOAD_USER }),
    fork(watchAPIKeys),
    fork(watchUser),
  ];
}
