import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SignupForm from '../components/signup-form';

import { signup } from '../store/modules/user';
import { createStashEventValueFn } from '../store/modules/stash';

// We'll use the Redux `connect` function to simplify the process of setting the
// properties in our component.

// Map the parts of the app state object that our component needs, to properties
// of our component.
const mapStateToProps = (state) => ({
  error: state.user.error,
  signingUp: state.user.signingUp,
  ...state.stash.signupForm,
});

const stashEvent = createStashEventValueFn('signupForm');

// Map action dispatch functions to properties of our component.
// `bindActionCreators` will wrap each of our action creators in a function that
// will call dispatch on the store with our action.
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ signup, stashEvent }, dispatch),
});

// don't use pure function components for views or react-transform-hmr
// won't work for us (for now)
export default class Signup extends Component {

  render () {
    const { actions, email, signingUp, error } = this.props;
    const formProps = {
      email, signingUp, error,
      handleSubmit: (subEmail) => actions.signup({ email: subEmail }),
      onInputChange: actions.stashEvent,
    };

    return (
      <div className="container text-center">
        <h1>This is the signup view!</h1>
        <div className="text-left col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-offset-4 col-lg-4">
          <SignupForm {...formProps} />
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  actions: PropTypes.object.isRequired,
  error: PropTypes.object,
  signupError: PropTypes.object,
  email: PropTypes.string,
  signingUp: PropTypes.bool,
};

// connect our Signup component to redux state and dispatch methods
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
