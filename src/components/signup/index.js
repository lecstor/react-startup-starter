import React, { Component } from 'react';

import SignupFormContainer from '../../containers/signup';
import SignupForm from './form-default';

// don't use pure function components for views or react-transform-hmr
// won't work for us (for now)
export default class Login extends Component {
  render () {
    return (
      <SignupFormContainer>
        <SignupForm />
      </SignupFormContainer>
    );
  }
}
