import React, { PropTypes } from 'react';
import get from 'lodash/get';

import Alert from '../../elements/alert';
import Button from '../../elements/button';
import Form from '../../elements/form';
import Input from '../../elements/input';

import inputSty from '../../elements/input/index.css';

/**
 * Signup Form Component
 * @param   {Object}   options
 * @param   {Object}   options.formFields
 * @param   {String}   options.formFields.email
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
  <Form onSubmit={handleSubmit}>
    {serverError && <Alert type="error">{serverError}</Alert>}
    <div className={inputSty.label}>Your Email Address</div>
    <Input name="email" type="email" placeholder="email" value={formFields.email}
      onChange={onInputChange}
    />
    {get(error, 'fields.email') && <Alert type="warning">{error.fields.email}</Alert>}
    <Button type="safe" floatRight active={signingUp} onClick={handleSubmit}>
      Sign Up
    </Button>
  </Form>
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
