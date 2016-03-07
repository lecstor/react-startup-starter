import React from 'react';
import tape from 'blue-tape';
import { shallow } from 'enzyme';

import LoginForm from './';

let changeTriggered = 0;
let submitClicked = 0;

const props = {
  handleSubmit: () => submitClicked++,
  onInputChange: () => changeTriggered++,
  error: {},
};

tape('LoginForm Component', nest => {
  nest.test('- Displays correctly with no errors', test => {
    const wrapper = shallow(<LoginForm {...props} />);
    test.equal(wrapper.type(), 'form', 'login form node is a form');
    test.equal(wrapper.find('Input').length, 2, 'node has two inputs');
    test.equal(wrapper.find('Button').length, 1, 'node has one button');
    test.equal(wrapper.find('Alert').length, 0, 'node has no alerts');
    test.end();
  });

  nest.test('- Displays correctly with request error', test => {
    const tProps = Object.assign(
      {}, props, { error: { server: { message: 'Something is not right' } } }
    );
    const wrapper = shallow(<LoginForm {...tProps} />);
    const alert = wrapper.find('Alert');
    test.equal(alert.length, 1, 'node has one alert');
    test.equal(alert.shallow().text(), 'Something is not right', 'alert text is correct');
    test.end();
  });

  nest.test('- Displays correctly with email input error', test => {
    const tProps = Object.assign(
      {}, props, { error: { fields: { email: 'That is not an email address' } } }
    );
    const wrapper = shallow(<LoginForm {...tProps} />);
    const alert = wrapper.find('Alert');
    test.equal(alert.length, 1, 'node has one alert');
    test.equal(alert.shallow().text(), 'That is not an email address', 'alert text is correct');
    test.end();
  });

  nest.test('- Displays correctly with password input error', test => {
    const tProps = Object.assign(
      {}, props, { error: { fields: { password: 'Incorrect Password' } } }
    );
    const wrapper = shallow(<LoginForm {...tProps} />);
    const alert = wrapper.find('Alert');
    test.equal(alert.length, 1, 'node has one alert');
    test.equal(alert.shallow().text(), 'Incorrect Password', 'alert text is correct');
    test.end();
  });

  nest.test('- Fires login action on button click', test => {
    submitClicked = 0;
    const wrapper = shallow(<LoginForm {...props} />);
    const button = wrapper.find('Button');
    button.simulate('click');
    test.equal(submitClicked, 1, 'click fired login action');
    test.end();
  });

  nest.test('- Fires actions on input change', test => {
    changeTriggered = 0;
    const wrapper = shallow(<LoginForm {...props} />);
    const inputs = wrapper.find('Input');
    const emailInput = inputs.at(0);
    emailInput.simulate('change', { target: { value: 'hello' } });
    const passInput = inputs.at(1);
    passInput.simulate('change', { target: { value: 'hello' } });
    test.equal(changeTriggered, 2, 'change fired input actions');
    test.end();
  });
});
