import React, { PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import Promise from 'bluebird';

import Input from 'react-bootstrap/lib/Input';
import Button from 'react-bootstrap/lib/Button';
import Alert from 'react-bootstrap/lib/Alert';

/**
 * the store auth module has an async login action, but I haven't figured out if/how I can
 * use that with redux-form, so we'll dispatch the actions manually in our submit handler.
 */
import fetch from '../../store/customFetch';
import { loginSubmit, loginSuccess, loginFail } from '../../store/modules/auth';

export const submitForm = (creds, dispatch) => {
  // update the store to say we're sending a login request to the server
  dispatch(loginSubmit());
  // send the login request
  return fetch('/auth/login', { method: 'post', body: JSON.stringify(creds) })
  .then(
    payload => {
      // update the store with our logged in user details
      dispatch(loginSuccess(payload));
      return Promise.resolve(payload);
    },
    error => {
      dispatch(loginFail(error));
      error._error = error.message;
      Object.assign(error, error.details || {});
      return Promise.reject(error);
    }
  );
};

export const LoginForm = ({ handleSubmit, error, fields, submitting }) => {
  const emailError = fields.email.touched && fields.email.error;
  const passError = fields.password.touched && fields.password.error;
  let emailAlert = emailError ? 'error' : undefined;
  const passAlert = passError ? 'error' : undefined;
  if (passAlert) emailAlert = 'success';

  return (
    <form onSubmit={handleSubmit}>
      <Input label="Email" type="email" placeholder="email" {...fields.email}
        bsStyle={emailAlert} hasFeedback={emailAlert ? true : false}
      />
      <Input label="Password" type="password" placeholder="password" {...fields.password}
        bsStyle={passAlert} hasFeedback={passAlert ? true : false}
      />
      <div style={{ textAlign: 'right', marginBottom: '5px' }}>
        <Button active={submitting} onClick={handleSubmit}> Log In </Button>
      </div>
      {error && !(emailError || passError) && <Alert bsStyle="danger">{error}</Alert>}
      {emailError && <Alert bsStyle="danger">{fields.email.error}</Alert>}
      {passError && <Alert bsStyle="danger">{fields.password.error}</Alert>}
    </form>
  );
};

LoginForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  submitting: PropTypes.bool.isRequired,
};

// Export our form class as a redux-form with a unique name for this form,
// all the fields in the form, and our submit handler.
export default reduxForm({
  form: 'login_form',
  fields: ['email', 'password'],
  onSubmit: submitForm,
})(LoginForm);
