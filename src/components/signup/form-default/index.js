import React, { PropTypes } from 'react';
import get from 'lodash/get';

import Input from '../../elements/input';
import Alert from '../../elements/alert';

import sty from '../form.css';

/**
 * Signup Form Component
 * @param   {Object}   options
 * @param   {Object}   options.formFields
 * @param   {String}   options.formFields.name
 * @param   {String}   options.formFields.email
 * @param   {String}   options.formFields.password
 * @param   [{String}] options.emailAlert
 * @param   {Object}   options.error
 * @param   {String}   options.error.fields.email
 * @param   {String}   options.error.fields.password
 * @param   {String}   options.serverError
 * @param   {Boolean}  options.signingUp
 * @param   {Function} options.onInputChange
 * @param   {Function} options.handleSubmit
 * @returns {Component}
 */
const SignupForm = (
  { formFields = {}, error, serverError, signingUp, onInputChange, handleSubmit }
) => (
  <form onSubmit={handleSubmit}>
    {serverError && <Alert type="error">{serverError}</Alert>}
    <div className={sty.label}>Your Name</div>
    <Input className={sty.input} name="name" type="text" placeholder="name"
      onChange={onInputChange} value={formFields.name}
    />
    <div className={sty.label}>Your Email Address</div>
    <Input className={sty.input} name="email" type="email" placeholder="email"
      onChange={onInputChange} value={formFields.email}
    />
    {get(error, 'fields.email') && <Alert type="warning">{error.fields.email}</Alert>}

    <div className={sty.label}>Your New Password</div>
    <Input className={sty.input} name="password" type="password" placeholder="password"
      onChange={onInputChange} value={formFields.password}
    />
    <div style={{ textAlign: 'right', marginBottom: '5px' }}>
      <button className={sty.button} active={signingUp} onClick={handleSubmit}> Sign Up </button>
    </div>
  </form>
);

SignupForm.propTypes = {
  formFields: PropTypes.object,
  emailAlert: PropTypes.string,
  signingUp: PropTypes.bool,
  error: PropTypes.object,
  serverError: PropTypes.string,
  handleSubmit: PropTypes.func,
  onInputChange: PropTypes.func,
};

export default SignupForm;
