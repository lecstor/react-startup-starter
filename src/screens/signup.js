import React, { Component } from 'react';

import SignupFormContainer from '../containers/signup';
import SignupForm from '../components/signup-form-basic';

// don't use pure function components for views or react-transform-hmr
// won't work for us (for now)
export default class Signup extends Component {
  render () {
    return (
      <div className="container text-center">
        <h1>This is the signup view!</h1>
        <div className="text-left col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-offset-4 col-lg-4">
          <SignupFormContainer>
            <SignupForm />
          </SignupFormContainer>
        </div>
      </div>
    );
  }
}
