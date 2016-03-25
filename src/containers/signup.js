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
  userState: state.user,
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
    const { actions, formFields, userState } = this.props;
    const error = userState.saga === 'signUp' ? userState.error : undefined;
    const formProps = {
      handleSubmit: () => actions.signup(formFields),
      onInputChange: actions.stashEvent,
    };
    if (formFields) formProps.formFields = formFields;
    if (userState.signingUp) formProps.signingUp = userState.signingUp;
    if (error) {
      if (error.isServer) {
        formProps.serverError = error.statusText;
      } else {
        formProps.error = userState.error;
      }
      if (error.fields && error.fields.email) formProps.emailAlert = 'error';
    }
    return React.cloneElement(this.props.children, formProps);
  }
}

Signup.propTypes = {
  children: PropTypes.node,
  actions: PropTypes.object.isRequired,
  userState: PropTypes.object,
  signupError: PropTypes.object,
  formFields: PropTypes.object,
};

// connect our Signup component to redux state and dispatch methods
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
