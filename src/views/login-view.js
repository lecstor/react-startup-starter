import React from 'react';
import { Link } from 'react-router';

const LoginView = () => (
  <div className="container text-center">
    <h1>This is the login view!</h1>
    <hr />
    <Link to="/">Back To Home View</Link>
  </div>
);

export default LoginView;
