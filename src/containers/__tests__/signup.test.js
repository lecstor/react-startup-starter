import React from 'react';
import tape from 'blue-tape';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from '../../store';

import Login from '../signup';

function mountComponent (store) {
  return mount(
    <Provider store={store}>
      <Login />
    </Provider>
  );
}

tape('# Signup', nest => {
  nest.test('  Submit the form', test => {
    const store = configureStore();
    const wrapper = mountComponent(store);

    const inputs = wrapper.find('Input');
    const emailInput = inputs.at(0);
    emailInput.simulate('change', { target: { name: 'email', value: 'myemail' } });
    test.equals(emailInput.props().value, 'myemail', 'email set on change');

    const button = wrapper.find('Button');
    button.simulate('click');
    test.ok(button.hasClass('active'), 'button is active');
    test.end();
  });
});
