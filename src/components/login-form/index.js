import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import Promise from 'bluebird';
import fetch from 'isomorphic-fetch';

import Input from 'react-bootstrap/lib/Input';
import Button from 'react-bootstrap/lib/Button';
import Alert from 'react-bootstrap/lib/Alert';

import { login as loginAction } from '../../store/modules/user';

// To have fetch Promise reject on HTTP error statuses, i.e. on any non-2xx status, define a custom response handler
function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function parseJSON (response) {
  return response.json();
}

// const submit = (values, dispatch) => {
const submit = (values, dispatch) => {
  return new Promise((resolve, reject) => {
    fetch('/auth/login', {
      method: 'post',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
      credentials: 'same-origin',
    })
    .then(checkStatus)
    .then(parseJSON)
    .then(
      payload => {
        if (payload.ok) {
          dispatch(loginAction(payload.user));
          resolve();
        } else {
          const err = new Error(payload.error);
          err.email = payload.email;
          err.password = payload.password;
          err._error = payload.error;
          reject(err);
        }
      },
      error => {
        const err = new Error(error);
        err._error = error.message;
        reject(err);
      }
    );
  });
};

export class ContactForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.string,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    // loginAction: PropTypes.func.isRequired,
  };
  render () {
    const { fields: { email, password }, error, handleSubmit, submitting } = this.props;
    return (
      <div className="col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">
        <form className="form-horizontal" onSubmit={handleSubmit}>
          <Input label="Email" labelClassName="col-xs-4"
                 wrapperClassName="col-xs-8" type="email" placeholder="email" {...email}/>
          {email.touched && email.error && <Alert bsStyle="danger">{email.error}</Alert>}
          <Input label="Password" labelClassName="col-xs-4"
                 wrapperClassName="col-xs-8" type="password" placeholder="password" {...password}/>
          {password.touched && password.error && <Alert bsStyle="danger">{password.error}</Alert>}
          {error && !(email.error || password.error) && <Alert bsStyle="danger">{error}</Alert>}
          <div style={{ textAlign: 'right' }}>
            <Button active={submitting} onClick={handleSubmit}> Log In </Button>
          </div>
        </form>
      </div>
    );
  }
}

// a unique name for this form and all the fields in your form
export default reduxForm({
  form: 'login_form',
  fields: ['email', 'password'],
  onSubmit: submit,
})(ContactForm);
