import React, { Component, PropTypes } from 'react';
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

const submit = (creds, dispatch) => {
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
      dispatch(loginFail({ error: 'Login failed' }));
      error._error = error.message;
      Object.assign(error, error.details || {});
      return Promise.reject(error);
    }
  );
};

export class LoginForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.string,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
  };
  render () {
    const { fields: { email, password }, error, handleSubmit, submitting } = this.props;
    return (
      <div className="col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">
        <form className="form-horizontal" onSubmit={handleSubmit}>
          {error && !(email.error || password.error) && <Alert bsStyle="danger">{error}</Alert>}
          <Input label="Email" labelClassName="col-xs-4"
                 wrapperClassName="col-xs-8" type="email" placeholder="email" {...email}/>
          {email.touched && email.error && <Alert bsStyle="danger">{email.error}</Alert>}
          <Input label="Password" labelClassName="col-xs-4"
                 wrapperClassName="col-xs-8" type="password" placeholder="password" {...password}/>
          {password.touched && password.error && <Alert bsStyle="danger">{password.error}</Alert>}
          <div style={{ textAlign: 'right' }}>
            <Button active={submitting} onClick={handleSubmit}> Log In </Button>
          </div>
        </form>
      </div>
    );
  }
}

// Export our form class as a redux-form with a unique name for this form,
// all the fields in the form, and our submit handler.
export default reduxForm({
  form: 'login_form',
  fields: ['email', 'password'],
  onSubmit: submit,
})(LoginForm);
