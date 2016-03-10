/* eslint-disable no-constant-condition */

import { push as redirectTo } from 'react-router-redux';

import { call, put, fork, take } from 'redux-saga/effects';
import fetch from '../store/customFetch';
import {
  LOAD, LOAD_SUCCESS, LOAD_FAIL,
  SIGNUP, SIGNUP_SUCCESS, SIGNUP_FAIL,
  UPDATE, UPDATE_SUCCESS, UPDATE_FAIL,
  LOGIN, LOGIN_SUCCESS, LOGIN_FAIL,
  LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL,
} from '../store/modules/user';

function* loadUser () {
  while (true) {
    yield take(LOAD);
    try {
      const response = yield call(fetch, '/user');
      yield put({ type: LOAD_SUCCESS, result: response.result });
    } catch (e) {
      yield put({ type: LOAD_FAIL, error: e });
    }
  }
}

function* signUp () {
  while (true) {
    const action = yield take(SIGNUP);
    const user = action.payload;
    try {
      const response = yield call(
        fetch, '/user', { method: 'post', body: JSON.stringify(user) }
      );
      yield put({ type: SIGNUP_SUCCESS, result: response.result });
      yield put(redirectTo('/app'));
    } catch (e) {
      yield put({ type: SIGNUP_FAIL, error: e });
    }
  }
}

function* update () {
  while (true) {
    const action = yield take(UPDATE);
    const user = action.payload;
    try {
      const response = yield call(
        fetch, '/user', { method: 'put', body: JSON.stringify(user) }
      );
      yield put({ type: UPDATE_SUCCESS, result: response.result });
    } catch (e) {
      yield put({ type: UPDATE_FAIL, error: e });
    }
  }
}

function* logIn () {
  while (true) {
    const action = yield take(LOGIN);
    const { creds, sourcePath } = action.payload;
    try {
      const response = yield call(
        fetch, '/session', { method: 'post', body: JSON.stringify(creds) }
      );
      yield put({ type: LOGIN_SUCCESS, result: response.result });
      const target = /^\/app/.test(sourcePath) ? sourcePath : '/app';
      yield put(redirectTo(target));
    } catch (e) {
      yield put({ type: LOGIN_FAIL, error: e });
    }
  }
}

function* logOut () {
  while (true) {
    yield take(LOGOUT);
    try {
      const response = yield call(fetch, '/session', { method: 'delete' });
      yield put({ type: LOGOUT_SUCCESS, result: response.result });
      yield put(redirectTo('/'));
    } catch (e) {
      yield put({ type: LOGOUT_FAIL, error: e });
    }
  }
}

function* watchUser () {
  yield fork(loadUser);
  yield fork(signUp);
  yield fork(update);
  yield fork(logIn);
  yield fork(logOut);
}

export { watchUser };
