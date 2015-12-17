import React from 'react';

import LoginForm from '../components/login-form';

const LoginView = () => (
  <div className="container text-center">
    <h1>This is the login view!</h1>
    <p>email: "ok@example.com" password: "password"</p>
    <p>"boom" to break the server</p>
    <div className="text-left col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-offset-4 col-lg-4">
      <LoginForm />
    </div>
  </div>
);

export default LoginView;
