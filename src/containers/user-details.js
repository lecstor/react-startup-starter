import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { createStashEventValueFn } from '../store/modules/stash';
import { update } from '../store/modules/user';

const mapStateToProps = (state) => ({
  user: state.user,
  form: state.stash.userDetailsForm || {},
});

const stashEvent = createStashEventValueFn('userDetailsForm');

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ update, stashEvent }, dispatch),
});

export class UserDetails extends Component {
  render () {
    const { actions, user, form, error } = this.props;

    const err = error ? { ...error, ...error.props } : {};
    const name = form.name || user.data.name;
    const email = form.email || user.data.email;
    const emailValid = /[^\.\s]+\@[^\.\s]+\.[^\.\s]+/.test(email);

    const formProps = {
      actions, name, email,
      error: err,
      bsStyle: emailValid ? undefined : 'error',
      bsFeed: emailValid,
      isSaving: form.isSaving,
      saveDisabled: !emailValid,
      handleSave: () => actions.update({ name, email }),
    };

    return React.cloneElement(this.props.children, formProps);
  }
}

UserDetails.propTypes = {
  children: PropTypes.node,
  actions: PropTypes.object.isRequired,
  user: PropTypes.object,
  form: PropTypes.object,
  error: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
