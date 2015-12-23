import React from 'react';
import tape from 'blue-tape';
import { shallow } from 'enzyme';

import LoginForm from './';

tape('# LoginForm - Pure Function Component', nest => {
  nest.test('Displays correctly with no errors', test => {
    const props = {
      actions: {},
      email: '',
      password: '',
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
      error: new Error('Something is not right'),
      actions: {},
      email: '',
      password: '',
    };
    const wrapper = shallow(<LoginForm {...props} />);
    const alert = wrapper.find('Alert');
    test.equal(alert.length, 1, 'node has one alert');
    test.equal(alert.shallow().text(), 'Something is not right', 'alert text is correct');
    test.end();
  });

  nest.test('Displays correctly with email input error', test => {
    const props = {
      loginError: { email: 'That is not an email address' },
      actions: {},
      email: '',
      password: '',
    };
    const wrapper = shallow(<LoginForm {...props} />);
    const alert = wrapper.find('Alert');
    test.equal(alert.length, 1, 'node has one alert');
    test.equal(alert.shallow().text(), 'That is not an email address', 'alert text is correct');
    test.end();
  });

  nest.test('Displays correctly with password input error', test => {
    const props = {
      loginError: { password: 'Incorrect Password' },
      actions: {},
      email: '',
      password: '',
    };
    const wrapper = shallow(<LoginForm {...props} />);
    const alert = wrapper.find('Alert');
    test.equal(alert.length, 1, 'node has one alert');
    test.equal(alert.shallow().text(), 'Incorrect Password', 'alert text is correct');
    test.end();
  });
});

