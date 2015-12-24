import React from 'react';
import tape from 'blue-tape';
import { shallow } from 'enzyme';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';

import { LoginForm, submitForm } from './';
import hyperActions from '../../store/middleware/hyperActions';
import reducer, { loginSubmit, loginSuccess, loginFail, loginRequestFail } from '../../store/modules/auth';

const middlewares = [hyperActions];
const mockStore = configureMockStore(middlewares);

tape('# LoginForm - Component', nest => {
  nest.test('Displays correctly with no errors', test => {
    const props = {
      handleSubmit: () => {},
      submitting: false,
      error: undefined,
      fields: {
        email: { value: '', touched: false, error: undefined },
        password: { value: '', touched: false, error: undefined },
      },
    };
    const wrapper = shallow(<LoginForm {...props} />);
    test.equal(wrapper.type(), 'form', 'login form node is a form');
    test.equal(wrapper.find('Input').length, 2, 'node has two inputs');
    test.equal(wrapper.find('Button').length, 1, 'node has one button');
    test.equal(wrapper.find('Alert').length, 0, 'node has no alerts');
    test.end();
  });

  nest.test('Displays correctly with form error', test => {
    const props = {
      handleSubmit: () => {},
      submitting: false,
      error: 'Something is not right',
      fields: {
        email: { value: '', touched: false, error: undefined },
        password: { value: '', touched: false, error: undefined },
      },
    };
    const wrapper = shallow(<LoginForm {...props} />);
    const alert = wrapper.find('Alert');
    test.equal(alert.length, 1, 'node has one alert');
    test.equal(alert.shallow().text(), 'Something is not right', 'alert text is correct');
    test.end();
  });

  nest.test('Displays correctly with email input error', test => {
    const props = {
      handleSubmit: () => {},
      submitting: false,
      error: 'Something is not right',
      fields: {
        email: { value: '', touched: true, error: 'That is not an email address' },
        password: { value: '', touched: false, error: undefined },
      },
    };
    const wrapper = shallow(<LoginForm {...props} />);
    const alert = wrapper.find('Alert');
    test.equal(alert.length, 1, 'node has one alert');
    test.equal(alert.shallow().text(), 'That is not an email address', 'alert text is correct');
    test.end();
  });

  nest.test('Displays correctly with password input error', test => {
    const props = {
      handleSubmit: () => {},
      submitting: false,
      error: undefined,
      fields: {
        email: { value: '', touched: true, error: undefined },
        password: { value: '', touched: true, error: 'Incorrect Password' },
      },
    };
    const wrapper = shallow(<LoginForm {...props} />);
    const alert = wrapper.find('Alert');
    test.equal(alert.length, 1, 'node has one alert');
    test.equal(alert.shallow().text(), 'Incorrect Password', 'alert text is correct');
    test.end();
  });
});

tape('# LoginForm - login action', nest => {
  nest.test('Dispatch Login Action Success', test => {
    const successPayload = { id: 123321, email: 'ok@example.com', name: 'Buddy' };
    const expectedActions = [loginSubmit(), loginSuccess(successPayload)];
    fetchMock.mock('http://localhost:9876/auth/login', { result: successPayload });

    const store = mockStore({}, expectedActions, () => {
      test.ok(true, 'expected actions were fired');
    });

    submitForm({ email: 'ok@example.com', password: 'password' }, store.dispatch)
    .then(
      payload => {
        test.deepEquals(payload, successPayload, 'success payload correct');
        test.end();
      },
      () => {
        test.ok(false, 'success payload correct');
        test.end();
      },
    );
  });

  nest.test('Redux Form Dispatch Login Action Fail', test => {
    const failPayload = { message: 'Login failed', props: { password: 'The password is incorrect' } };

    const expectedActions = [loginSubmit(), loginFail(failPayload)];
    fetchMock.reMock('http://localhost:9876/auth/login', { error: failPayload });

    const store = mockStore({}, expectedActions, () => {
      test.ok(true, 'expected actions were fired');
    });

    const expectedError = new Error('Login Failed');
    expectedError._error = 'Login failed';
    expectedError.password = 'The password is incorrect';

    submitForm({ email: 'ok@example.com', password: 'password' }, store.dispatch)
    .then(
      () => {
        test.ok(false, 'fail payload correct');
        test.end();
      },
      error => {
        test.deepEquals(error, expectedError, 'fail payload correct');
        test.end();
      },
    );
  });

  nest.test('Dispatch Login Action Server Fail', test => {
    const expectedActions = [loginSubmit(), loginFail(new Error('Login Failed'))];
    fetchMock.reMock('http://localhost:9876/auth/login', 500);

    const store = mockStore({}, expectedActions, () => {
      test.ok(true, 'expected actions were fired');
    });

    submitForm({ email: 'ok@example.com', password: 'password' }, store.dispatch)
    .then(
      () => { test.ok(false, 'server fail error correct'); test.end(); },
      (error) => {
        test.ok(error instanceof Error, 'server fail error correct');
        test.end();
      },
    );
  });
});

tape('# LoginForm - login reducer', nest => {
  nest.test('return the initial state', test => {
    test.deepEquals(reducer(undefined, {}), { loaded: false });
    test.end();
  });

  nest.test('handle LOGIN', test => {
    const action = loginSubmit();
    const expected = { loaded: false, loggingIn: true };
    test.deepEquals(reducer(undefined, action), expected, 'reducer LOGIN ok');
    test.end();
  });

  nest.test('handle LOGIN_SUCCESS', test => {
    const action = loginSuccess({ name: 'Fred' });
    const expected = { loaded: true, loggingIn: false, user: { name: 'Fred' }, loginError: undefined, error: undefined };
    test.deepEquals(reducer(undefined, action), expected, 'reducer LOGIN_SUCCESS ok');
    test.end();
  });

  nest.test('handle LOGIN_FAIL', test => {
    const action = loginFail({ password: 'The password is incorrect' });
    const expected = { loaded: false, loggingIn: false, error: undefined, loginError: { password: 'The password is incorrect' } };
    test.deepEquals(reducer(undefined, action), expected, 'reducer LOGIN_FAIL ok');
    test.end();
  });

  nest.test('handle LOGIN_REQUEST_FAIL', test => {
    const error = new Error('Kaboom!');
    const action = loginRequestFail(error);
    const expected = { loaded: false, loggingIn: false, loginError: undefined, error };
    test.deepEquals(reducer(undefined, action), expected, 'reducer LOGIN_REQUEST_FAIL ok');
    test.end();
  });
});
