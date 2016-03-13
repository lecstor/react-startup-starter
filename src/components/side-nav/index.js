import React from 'react';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import { LinkContainer } from 'react-router-bootstrap';

const SideNavApp = () => (
  <Nav bsStyle="pills" stacked>
    <LinkContainer to="/user-details"><NavItem>Your Details</NavItem></LinkContainer>
    <LinkContainer to="/apikeys"><NavItem>API Keys</NavItem></LinkContainer>
  </Nav>
);

export default SideNavApp;
