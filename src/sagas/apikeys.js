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
  while (true) {
    yield take(LOAD);
    try {
      const response = yield call(fetch, '/apikeys');
      yield put({ type: LOAD_SUCCESS, result: response.result });
    } catch (e) {
      yield put({ type: LOAD_FAIL, error: e.message });
    }
  }
}

function* createKey () {
  while (true) {
    const action = yield take(CREATE);
    const key = action.payload;
    try {
      const response = yield call(
        fetch, '/apikeys', { method: 'post', body: JSON.stringify(key) }
      );
      yield put({ type: CREATE_SUCCESS, result: response.result });
    } catch (e) {
      yield put({ type: CREATE_FAIL, error: e.message });
    }
  }
}

function* updateKey () {
  while (true) {
    const action = yield take(UPDATE);
    const key = action.payload;
    try {
      const response = yield call(
        fetch, `/apikeys/${key.id}`, { method: 'put', body: JSON.stringify(key) }
      );
      yield put({ type: UPDATE_SUCCESS, result: response.result });
    } catch (e) {
      yield put({ type: UPDATE_FAIL, error: e.message });
    }
  }
}

function* deleteKey () {
  while (true) {
    const action = yield take(DELETE);
    const key = action.payload;
    try {
      yield call(
        fetch, `/apikeys/${key.id}`, { method: 'delete', body: JSON.stringify(key) }
      );
      yield put({ type: DELETE_SUCCESS, result: { id: key.id } });
    } catch (e) {
      yield put({ type: DELETE_FAIL, error: e.message });
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
