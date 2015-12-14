import React from 'react';

import LoginForm from '../components/login-form';
import userActions from '../components/user/action-creators'


const LoginView = () => (
  <div className="container text-center">
    <h1>This is the login view!</h1>
    <LoginForm loginAction={userActions.login} />
  </div>
);

export default LoginView;
