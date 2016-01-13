import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Input from 'react-bootstrap/lib/Input';
import Button from 'react-bootstrap/lib/Button';
import Alert from 'react-bootstrap/lib/Alert';
import Table from 'react-bootstrap/lib/Table';

import Spinner from '../../components/spinner';

import { createStashEventValueFn } from '../../store/modules/stash';
import { update } from '../../store/modules/user';

const mapStateToProps = (state) => ({
  user: state.user,
  form: state.stash.userDetailsForm || {},
});

const stashEvent = createStashEventValueFn('userDetailsForm');

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ update, stashEvent }, dispatch),
});

export default class UserDetails extends Component {
  render () {
    const { actions, user, form, error } = this.props;
    const err = error ? { ...error, ...error.props } : {};
    const name = form.name || user.data.name;
    const email = form.email || user.data.email;

    const emailValid = /[^\.\s]+\@[^\.\s]+\.[^\.\s]+/.test(email);
    const bsStyle = emailValid ? undefined : 'error';
    const bsFeed = emailValid ? false : true;
    const saveDisabled = !emailValid;

    const handleSave = () => actions.update({ name, email });

    return (
      <div style={{ textAlign: 'left', maxWidth: '500px' }}>
        <h1>Your Details</h1>
        <Input label="Your Name" name="name" type="text" placeholder="your name" onChange={actions.stashEvent} value={name} />
        <Input bsStyle={bsStyle} hasFeedback={bsFeed} label="Email/Login" name="email" type="email" placeholder="your email address" onChange={actions.stashEvent} value={email} />
        <div style={{ textAlign: 'right', marginBottom: '5px' }}>
          <Button active={form.isSaving} disabled={saveDisabled} bsStyle="success" onClick={handleSave}>Save</Button>
        </div>
        {err.server && <Alert bsStyle="danger">{err.server.message}</Alert>}
        {err.email && <Alert bsStyle="warning">{err.email}</Alert>}
      </div>
    );
  }
}

UserDetails.propTypes = {
  actions: PropTypes.object.isRequired,
  user: PropTypes.object,
  form: PropTypes.object,
  error: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
