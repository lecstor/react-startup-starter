import React from 'react';

import SignupForm from '../components/signup-form';

// don't use pure function components for views or react-transform-hmr
// won't work for us (for now)
export default class Signup extends React.Component {
  render () {
    return (
      <div className="container text-center">
        <h1>This is the signup view!</h1>
        <div className="text-left col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-offset-4 col-lg-4">
          <SignupForm />
        </div>
      </div>
    );
  }
}
