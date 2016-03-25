import React from 'react';
import tape from 'blue-tape';
import { shallow } from 'enzyme';

import SignupForm from './';

let changeTriggered = 0;
let submitClicked = 0;

const props = {
  handleSubmit: () => submitClicked++,
  onInputChange: () => changeTriggered++,
  error: {},
};

tape('SignupFormDefault Component', nest => {
  nest.test('- Displays correctly with no errors', test => {
    const wrapper = shallow(<SignupForm {...props} />);
    test.equal(wrapper.type(), 'form', 'signup form node is a form');
    test.equal(wrapper.find('button').length, 1, 'node has one button');
    test.equal(wrapper.find('Alert').length, 0, 'node has no alerts');
    test.end();
  });

  nest.test('- Displays correctly with request error', test => {
    const tProps = Object.assign(
      {}, props, { serverError: 'Something is not right' }
    );
    const wrapper = shallow(<SignupForm {...tProps} />);
    const alert = wrapper.find('Alert');
    test.equal(alert.length, 1, 'node has one alert');
    test.equal(alert.shallow().text(), 'Something is not right', 'alert text is correct');
    test.end();
  });

  nest.test('- Displays correctly with email input error', test => {
    const tProps = Object.assign(
      {}, props, { error: { fields: { email: 'That is not an email address' } } }
    );
    const wrapper = shallow(<SignupForm {...tProps} />);
    const alert = wrapper.find('Alert');
    test.equal(alert.length, 1, 'node has one alert');
    test.equal(alert.shallow().text(), 'That is not an email address', 'alert text is correct');
    test.end();
  });

  nest.test('- Fires signup action on button click', test => {
    submitClicked = 0;
    const wrapper = shallow(<SignupForm {...props} />);
    const button = wrapper.find('button');
    button.simulate('click');
    test.equal(submitClicked, 1, 'click fired login action');
    test.end();
  });

  nest.test('- Fires actions on input change', test => {
    changeTriggered = 0;
    const wrapper = shallow(<SignupForm {...props} />);
    const inputs = wrapper.find('Input');
    const emailInput = inputs.at(0);
    emailInput.simulate('change', { target: { value: 'hello' } });
    test.equal(changeTriggered, 1, 'change fired input action');
    test.end();
  });
});

