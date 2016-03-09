import { fork } from 'redux-saga/effects';
import { watchAPIKeys } from './apikeys';
import { watchUser } from './user';

export default function* root () {
  yield [
    fork(watchAPIKeys),
    fork(watchUser),
  ];
}
