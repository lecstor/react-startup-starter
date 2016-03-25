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

// function reqSuccess({ saga, type, response }) {
//   if (response.fail_code) {
//     put({ saga, type: `${type}_FAIL`, payload: response });
//   } else {
//     put({ saga, type: `${type}_SUCCESS`, payload: response.data });
//   }
// }

function* loadUser () {
  const saga = 'loadUser';
  while (true) {
    yield take(LOAD);
    const response = yield call(fetch, '/user');
    const type = response.ok ? LOAD_SUCCESS : LOAD_FAIL;
    yield put({ saga, type, payload: response.data });
  }
}

function* signUp () {
  const saga = 'signUp';
  while (true) {
    const action = yield take(SIGNUP);
    const user = action.payload;
    const response = yield call(fetch, '/user', { method: 'post', body: JSON.stringify(user) });
    const type = response.ok ? SIGNUP_SUCCESS : SIGNUP_FAIL;
    yield put({ saga, type, payload: response.data });
  }
}

function* update () {
  const saga = 'update';
  while (true) {
    const action = yield take(UPDATE);
    const user = action.payload;
    const response = yield call(fetch, '/user', { method: 'put', body: JSON.stringify(user) });
    const type = response.ok ? UPDATE_SUCCESS : UPDATE_FAIL;
    yield put({ saga, type, payload: response.data });
  }
}

function* logIn () {
  const saga = 'logIn';
  while (true) {
    const action = yield take(LOGIN);
    const { creds } = action.payload;
    const response = yield call(fetch, '/session', { method: 'post', body: JSON.stringify(creds) });
    const type = response.ok ? LOGIN_SUCCESS : LOGIN_FAIL;
    yield put({ saga, type, payload: response.data });
  }
}

function* logOut () {
  const saga = 'logOut';
  while (true) {
    yield take(LOGOUT);
    const response = yield call(fetch, '/session', { method: 'delete' });
    if (response.ok) {
      yield put({ saga, type: LOGOUT_SUCCESS, payload: response.data });
      yield put(redirectTo('/'));
    } else {
      yield put({ saga, type: LOGOUT_FAIL, payload: response });
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
