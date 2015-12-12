import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
// import {show as showResults} from '../redux/modules/submission';

import Input from 'react-bootstrap/lib/Input';
import Button from 'react-bootstrap/lib/Button';

// const submit = (values, dispatch) => {
const submit = (values) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!['john', 'paul', 'george', 'ringo'].includes(values.email)) {
        reject({ email: 'User does not exist', _error: 'Login failed!' });
      } else if (values.password !== 'redux-form') {
        reject({ password: 'Wrong password', _error: 'Login failed!' });
      } else {
        // dispatch(showResults(values));
        console.log(JSON.stringify(values));
        resolve();
      }
    }, 1000); // simulate server latency
  });
};

export class ContactForm extends Component {
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
        <form className="form-horizontal" onSubmit={handleSubmit(submit)}>
          <Input label="Email" labelClassName="col-xs-4"
                 wrapperClassName="col-xs-8" type="email" placeholder="email" {...email}/>
          {email.touched && email.error && <div className="col-xs-offset-4 col-xs-8">{email.error}</div>}
          <Input label="Password" labelClassName="col-xs-4"
                 wrapperClassName="col-xs-8" type="password" placeholder="password" {...password}/>
          {password.touched && password.error && <div className="col-xs-offset-4 col-xs-8">{password.error}</div>}
          {error && <div>{error}</div>}
          <div style={{ textAlign: 'right' }}>
            <Button disabled={submitting} onClick={handleSubmit(submit)}>
              {submitting ? <i/> : <i/>} Log In
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

// a unique name for this form and all the fields in your form
export default reduxForm({ form: 'login_form', fields: ['email', 'password'] })(ContactForm);
