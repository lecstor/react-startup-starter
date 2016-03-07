import React, { Component } from 'react';
import tape from 'blue-tape';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import isFunction from 'lodash/isFunction';
import omit from 'lodash/omit';

import LoginContainer from '../login';

class Stub extends Component {
  render () {
    return <div {...this.props} />;
  }
}
// const Stub = (props = {}) => (<div {...props} />);

function mountComponent (store, { containerProps = {} } = {}) {
  return mount(
    <Provider store={store}>
      <LoginContainer {...containerProps}>
        <Stub />
      </LoginContainer>
    </Provider>
  );
}

tape('Login Container', nest => {
  nest.test('- Props from empty store', test => {
    const store = createStore(() => ({ stash: {}, user: {} }));
    const wrapper = mountComponent(store);
    const stub = wrapper.find(Stub);

    test.ok(isFunction(stub.props().handleSubmit), 'handleSubmit is function');
    test.ok(isFunction(stub.props().onInputChange), 'onInputChange is function');

    const expected = {
      formFields: undefined,
      loggingIn: undefined,
      emailAlert: undefined,
      passAlert: undefined,
      error: {},
    };
    const actual = omit(stub.props(), ['handleSubmit', 'onInputChange']);
    test.deepEqual(actual, expected, 'props');

    test.end();
  });

  nest.test('- Props from populated store', test => {
    const store = createStore(() => ({
      stash: {
        loginForm: { email: 'jason@lecstor.com', password: 'secretPassword' },
      },
      user: {
        loggingIn: true,
        error: { fields: { email: 'is that an email?', password: 'not secret enough' } },
      },
    }));
    const wrapper = mountComponent(store, { splat: 'from/there' });
    const stub = wrapper.find(Stub);

    const expected = {
      formFields: {
        email: 'jason@lecstor.com',
        password: 'secretPassword',
      },
      loggingIn: true,
      emailAlert: 'success',
      passAlert: 'error',
      error: {
        fields: {
          email: 'is that an email?',
          password: 'not secret enough',
        },
      },
    };
    const actual = omit(stub.props(), ['handleSubmit', 'onInputChange']);
    test.deepEqual(actual, expected, 'props');

    test.end();
  });
});
