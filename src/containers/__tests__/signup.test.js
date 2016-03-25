import React, { Component } from 'react';
import tape from 'blue-tape';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import isFunction from 'lodash/isFunction';
import omit from 'lodash/omit';

import SignupContainer from '../signup';

class Stub extends Component {
  render () {
    return <div {...this.props} />;
  }
}

function mountComponent (store) {
  return mount(
    <Provider store={store}>
      <SignupContainer>
        <Stub />
      </SignupContainer>
    </Provider>
  );
}

tape('Signup Container', nest => {
  nest.test('- Props from empty store', test => {
    const store = createStore(() => ({ stash: {}, user: {} }));
    const wrapper = mountComponent(store);
    const stub = wrapper.find(Stub);

    test.ok(isFunction(stub.props().handleSubmit), 'handleSubmit is function');
    test.ok(isFunction(stub.props().onInputChange), 'onInputChange is function');

    const expected = {};
    const actual = omit(stub.props(), ['handleSubmit', 'onInputChange']);
    test.deepEqual(actual, expected, 'props');

    test.end();
  });

  nest.test('- Props from populated store', test => {
    const store = createStore(() => ({
      stash: {
        signupForm: { name: 'Jason Galea', email: 'jason@lecstor.com', password: 'secretPassword' },
      },
      user: {
        saga: 'signUp',
        signingUp: true,
        error: { fields: { email: 'is that an email?' } },
      },
    }));
    const wrapper = mountComponent(store);
    const stub = wrapper.find(Stub);

    const expected = {
      formFields: {
        name: 'Jason Galea',
        email: 'jason@lecstor.com',
        password: 'secretPassword',
      },
      signingUp: true,
      emailAlert: 'error',
      error: {
        fields: {
          email: 'is that an email?',
        },
      },
    };
    const actual = omit(stub.props(), ['handleSubmit', 'onInputChange']);
    test.deepEqual(actual, expected, 'props');

    test.end();
  });
});
