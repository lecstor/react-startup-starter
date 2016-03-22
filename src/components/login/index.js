import React, { Component } from 'react';

import LoginFormContainer from '../../containers/login';
import LoginForm from './form';

// don't use pure function components for views or react-transform-hmr
// won't work for us (for now)
export default class Login extends Component {
  render () {
    return (
      <div style={{ textAlign: 'center' }}>
        <p>ok@example.com - password</p>
        <div style={{ textAlign: 'left' }}>
          <LoginFormContainer>
            <LoginForm />
          </LoginFormContainer>
        </div>
      </div>
    );
  }
}
