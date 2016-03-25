/* eslint-disable no-constant-condition */

import { call, put, fork, take } from 'redux-saga/effects';
import fetch from '../store/customFetch';
import {
  LOAD, LOAD_SUCCESS, LOAD_FAIL,
  CREATE, CREATE_SUCCESS, CREATE_FAIL,
  UPDATE, UPDATE_SUCCESS, UPDATE_FAIL,
  DELETE, DELETE_SUCCESS, DELETE_FAIL,
} from '../store/modules/apikeys';

function* loadKeys () {
  const saga = 'loadKeys';
  while (true) {
    yield take(LOAD);
    const response = yield call(fetch, '/apikeys');
    const type = response.ok ? LOAD_SUCCESS : LOAD_FAIL;
    yield put({ saga, type, payload: response.data });
  }
}

function* createKey () {
  const saga = 'createKey';
  while (true) {
    const action = yield take(CREATE);
    const key = action.payload;
    const response = yield call(
      fetch, '/apikeys', { method: 'post', body: JSON.stringify(key) }
    );
    const type = response.ok ? CREATE_SUCCESS : CREATE_FAIL;
    yield put({ saga, type, payload: response.data });
  }
}

function* updateKey () {
  const saga = 'updateKey';
  while (true) {
    const action = yield take(UPDATE);
    const key = action.payload;
    const response = yield call(
      fetch, `/apikeys/${key.id}`, { method: 'put', body: JSON.stringify(key) }
    );
    const type = response.ok ? UPDATE_SUCCESS : UPDATE_FAIL;
    yield put({ saga, type, payload: response.data });
  }
}

function* deleteKey () {
  const saga = 'deleteKey';
  while (true) {
    const action = yield take(DELETE);
    const key = action.payload;
    const response = yield call(
      fetch, `/apikeys/${key.id}`, { method: 'delete', body: JSON.stringify(key) }
    );
    if (response.ok) {
      yield put({ saga, type: DELETE_SUCCESS, payload: { id: key.id } });
    } else {
      yield put({ saga, type: DELETE_FAIL, payload: response.data });
    }
  }
}

function* watchAPIKeys () {
  yield fork(loadKeys);
  yield fork(createKey);
  yield fork(updateKey);
  yield fork(deleteKey);
}

export { watchAPIKeys };
