import React from 'react';
import tape from 'blue-tape';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from '../../store';

import LoginForm from './';

function mountForm (store) {
  return mount(
    <Provider store={store}>
      <LoginForm />
    </Provider>
  );
}

// log is work-around for ReferenceError: inspect is not defined
//    at Console.console.log (http://localhost:9876/base/node_modules/karma-tap/src/adapter.js:39:20)
// function log (...obj) { console.log(JSON.stringify(obj)); }

tape('# LoginForm - Component - Full Render', nest => {
  nest.test('  Submit the form', test => {
    const store = configureStore();
    const wrapper = mountForm(store);

    test.equal(wrapper.find('Alert').length, 0, 'node has no alerts');
    const button = wrapper.find('Button');
    test.equal(button.length, 1, 'node has one button');

    const inputs = wrapper.find('Input');
    const emailInput = inputs.at(0);
    emailInput.simulate('change', { target: { value: 'myemail' } });
    test.equals(emailInput.props().value, 'myemail', 'email set on change');

    const passInput = inputs.at(1);
    passInput.simulate('change', { target: { value: 'mypassword' } });
    test.equals(passInput.props().value, 'mypassword', 'password set on change');

    button.simulate('click');
    test.ok(button.hasClass('active'), 'button is active');
    test.end();
  });
});
