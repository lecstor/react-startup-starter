import React from 'react';

import Input from 'react-bootstrap/lib/Input';
import Button from 'react-bootstrap/lib/Button';
import Alert from 'react-bootstrap/lib/Alert';

/**
 * Signup Form Component
 * @param   {Object}   options
 * @param   {String}   options.name
 * @param   {String}   options.email
 * @param   {String}   options.password
 * @param   [{String}] options.emailAlert
 * @param   {Object}   options.error
 * @param   {String}   options.error.message
 * @param   {String}   options.error.fields.email
 * @param   {String}   options.error.fields.password
 * @param   {Number}   options.error.server.status
 * @param   {String}   options.error.server.message
 * @param   {Boolean}  options.signingUp
 * @param   {Function} options.onInputChange
 * @param   {Function} options.handleSubmit
 * @returns {Component}
 */
const SignupForm = ({ name, email, password, emailAlert, error, signingUp, onInputChange, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <Input label="Your Name" name="name" type="text" placeholder="name" onChange={onInputChange} value={name} />
    <Input label="Email" name="email" type="email" placeholder="email" onChange={onInputChange} value={email}
      bsStyle={emailAlert} hasFeedback={emailAlert ? true : false}
    />
    <Input label="Password" name="password" type="password" placeholder="password" onChange={onInputChange} value={password} />
    <div style={{ textAlign: 'right', marginBottom: '5px' }}>
      <Button active={signingUp} onClick={handleSubmit}> Sign Up </Button>
    </div>
    {error.server && <Alert bsStyle="danger">{error.server.message}</Alert>}
    {error.fields && error.fields.email && <Alert bsStyle="warning">{error.fields.email}</Alert>}
  </form>
);

export default SignupForm;
