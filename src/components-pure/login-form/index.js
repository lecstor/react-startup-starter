import React, { PropTypes } from 'react';

import Input from 'react-bootstrap/lib/Input';
import Button from 'react-bootstrap/lib/Button';
import Alert from 'react-bootstrap/lib/Alert';

/**
 * [description]
 * @param   {Object}   options.actions             [description]
 * @param   {Function} options.actions.login       [description]
 * @param   {Function} options.actions.setEmail    [description]
 * @param   {Function} options.actions.setPassword [description]
 * @param   {Error}    options.error               [description]
 * @param   {String}   options.loginError.error    [description]
 * @param   {String}   options.loginError.email    [description]
 * @param   {String}   options.loginError.password [description]
 * @param   {String}   options.email               [description]
 * @param   {String}   options.password            [description]
 * @param   {Boolean}  options.loggingIn           [description]
 * @returns {Component}                            [description]
 */
const LoginForm = ({ actions, email, password, loggingIn, error, loginError = { props: {} } }) => {
  const emailErr = loginError.props.email;
  const passErr = loginError.props.password;
  const passAlert = passErr ? 'error' : undefined;
  let emailAlert = emailErr ? 'error' : undefined;
  if (passAlert) emailAlert = 'success';

  const handleChange = action => event => action(event.target.value);
  const handleSubmit = () => actions.login({ email, password });

  return (
    <form onSubmit={handleSubmit}>
      <Input label="Email" type="email" placeholder="email" onChange={handleChange(actions.setEmail)} value={email}
        bsStyle={emailAlert} hasFeedback={emailAlert ? true : false}
      />
      <Input label="Password" type="password" placeholder="password" onChange={handleChange(actions.setPassword)} value={password}
        bsStyle={passAlert} hasFeedback={passAlert ? true : false}
      />
      <div style={{ textAlign: 'right', marginBottom: '5px' }}>
        <Button active={loggingIn} onClick={handleSubmit}> Log In </Button>
      </div>
      {error && <Alert bsStyle="danger">{error.message}</Alert>}
      {emailErr && <Alert bsStyle="warning">{emailErr}</Alert>}
      {passErr && <Alert bsStyle="warning">{passErr}</Alert>}
    </form>
  );
};

LoginForm.propTypes = {
  error: PropTypes.object,
  loginError: PropTypes.object,
  actions: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  loggingIn: PropTypes.bool,
};

export default LoginForm;
