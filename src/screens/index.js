import React from 'react';
import { Link } from 'react-router';

import SignupFormContainer from '../containers/signup';
import SignupForm from '../components/signup-form-email';

// don't use pure function components for views or
// react-transform-hmr won't work for us (for now)
export class IndexSite extends React.Component {
  render () {
    return (
      <div className="container text-center">
        <h1>Welcome to the React Startup Starter!</h1>
        <hr />
        <Link to="/login">Login</Link>
        <div style={{ width: '500px', margin: '0 auto', textAlign: 'left' }} >
          <h2>Sign Up</h2>
          <SignupFormContainer>
            <SignupForm />
          </SignupFormContainer>
        </div>
      </div>
    );
  }
}

export default IndexSite;
