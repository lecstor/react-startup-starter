import React, { Component } from 'react';

import UserDetailsFormContainer from '../../containers/app/user-details';
import UserDetailsForm from '../../components/user-details-form';

// don't use pure function components for views or react-transform-hmr
// won't work for us (for now)
export default class User extends Component {
  render () {
    return (
      <div className="container">
        <h1>Your Details</h1>
        <div className="text-left col-sm-8 col-md-6 col-lg-4">
          <UserDetailsFormContainer>
            <UserDetailsForm />
          </UserDetailsFormContainer>
        </div>
      </div>
    );
  }
}
