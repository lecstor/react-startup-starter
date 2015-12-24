import React, { PropTypes } from 'react';
import tape from 'blue-tape';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import LoginForm, { LoginForm as BareLoginForm } from './';
import hyperActions from '../../store/middleware/hyperActions';
import reducer, { setEmail, setPassword } from '../../store/modules/login-form';

const middlewares = [hyperActions];
const mockStore = configureMockStore(middlewares);

tape('# LoginForm - Bare Component', nest => {
  nest.test('Displays correctly with no errors', test => {
    const props = {
      actions: {},
      email: '',
      password: '',
    };
    const wrapper = shallow(<BareLoginForm {...props} />);
    test.equal(wrapper.type(), 'form', 'login form node is a form');
    test.equal(wrapper.find('Input').length, 2, 'node has two inputs');
    test.equal(wrapper.find('Button').length, 1, 'node has one button');
    test.equal(wrapper.find('Alert').length, 0, 'node has no alerts');
    test.end();
  });

  nest.test('Displays correctly with request error', test => {
    const props = {
      error: new Error('Something is not right'),
      actions: {},
      email: '',
      password: '',
    };
    const wrapper = shallow(<BareLoginForm {...props} />);
    const alert = wrapper.find('Alert');
    test.equal(alert.length, 1, 'node has one alert');
    test.equal(alert.shallow().text(), 'Something is not right', 'alert text is correct');
    test.end();
  });

  nest.test('Displays correctly with email input error', test => {
    const props = {
      loginError: { props: { email: 'That is not an email address' } },
      actions: {},
      email: '',
      password: '',
    };
    const wrapper = shallow(<BareLoginForm {...props} />);
    const alert = wrapper.find('Alert');
    test.equal(alert.length, 1, 'node has one alert');
    test.equal(alert.shallow().text(), 'That is not an email address', 'alert text is correct');
    test.end();
  });

  nest.test('Displays correctly with password input error', test => {
    const props = {
      loginError: { props: { password: 'Incorrect Password' } },
      actions: {},
      email: '',
      password: '',
    };
    const wrapper = shallow(<BareLoginForm {...props} />);
    const alert = wrapper.find('Alert');
    test.equal(alert.length, 1, 'node has one alert');
    test.equal(alert.shallow().text(), 'Incorrect Password', 'alert text is correct');
    test.end();
  });

  nest.test('Fires login action on button click', test => {
    let submitClicked = 0;
    const props = {
      actions: { login: () => submitClicked++ },
      email: '',
      password: '',
    };
    const wrapper = shallow(<BareLoginForm {...props} />);
    const button = wrapper.find('Button');
    button.simulate('click');
    test.equal(submitClicked, 1, 'click fired login action');
    test.end();
  });

  nest.test('Fires actions on input change', test => {
    let changeTriggered = 0;
    const props = {
      actions: {
        setEmail: () => changeTriggered++,
        setPassword: () => changeTriggered++,
      },
      email: '',
      password: '',
    };
    const wrapper = shallow(<BareLoginForm {...props} />);
    const inputs = wrapper.find('Input');
    const emailInput = inputs.at(0);
    emailInput.simulate('change', { target: { value: 'hello' } });
    const passInput = inputs.at(1);
    passInput.simulate('change', { target: { value: 'hello' } });
    test.equal(changeTriggered, 2, 'change fired input actions');
    test.end();
  });
});

