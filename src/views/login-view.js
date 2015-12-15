import React from 'react';

import LoginForm from '../components/login-form';
import { login } from '../store/modules/user';


const LoginView = () => (
  <div className="container text-center">
    <h1>This is the login view!</h1>
    <LoginForm loginAction={login} />
  </div>
);

export default LoginView;
