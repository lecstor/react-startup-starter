import React from 'react';
import { Route, IndexRoute } from 'react-router';
import AppLayout from '../layouts/app-layout';
import HomeView from '../views/home-view';
import AboutView from '../views/about-view';
import SignupView from '../views/signup-view';
import LoginView from '../views/login-view';

export default (
  <Route component={AppLayout} path="/">
    <IndexRoute component={HomeView} />
    <Route component={AboutView} path="/about" />
    <Route component={SignupView} path="/signup" />
    <Route component={LoginView} path="/login" />
  </Route>
);
