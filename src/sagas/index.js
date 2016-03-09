import { fork } from 'redux-saga/effects';
import { watchAPIKeys } from './apikeys';

export default function* root () {
  yield [
    fork(watchAPIKeys),
  ];
}
