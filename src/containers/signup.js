import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { signup } from '../store/modules/user';
import { createStashEventValueFn } from '../store/modules/stash';

// We'll use the Redux `connect` function to simplify the process of setting the
// properties in our component.

// Map the parts of the app state object that our component needs, to properties
// of our component.
const mapStateToProps = (state) => ({
  error: state.user.error,
  signingUp: state.user.signingUp,
  formFields: state.stash.signupForm,
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
export class Signup extends Component {

  render () {
    const { actions, formFields, signingUp, error = {} } = this.props;
    const formProps = {
      formFields, signingUp,
      error: error || {},
      emailAlert: error.fields && error.fields.email ? 'error' : undefined,
      handleSubmit: () => actions.signup(formFields),
      onInputChange: actions.stashEvent,
    };
    return React.cloneElement(this.props.children, formProps);
  }
}

Signup.propTypes = {
  children: PropTypes.node,
  actions: PropTypes.object.isRequired,
  error: PropTypes.object,
  signupError: PropTypes.object,
  formFields: PropTypes.object,
  signingUp: PropTypes.bool,
};

// connect our Signup component to redux state and dispatch methods
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
