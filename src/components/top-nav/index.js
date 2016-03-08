import React, { PropTypes } from 'react';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

const TopNav = ({ userLabel, loggingIn, loggingOut }) => {
  const styles = require('./style.scss');
  const messageStyle = `${styles.loggedInMessage} navbar-text`;
  return (
    <Navbar fixedTop className={styles.navbar}>
      <Navbar.Header>
        <Navbar.Brand className={styles.brand}>
          <IndexLink to="/"> React Startup Starter </IndexLink>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight navbar>
          {!userLabel &&
          <LinkContainer to="/signup">
            <NavItem>Sign Up</NavItem>
          </LinkContainer>}
          {!userLabel &&
          <LinkContainer to="/login">
            <NavItem>Login</NavItem>
          </LinkContainer>}
          {userLabel &&
          <LinkContainer to="/logout">
            <NavItem>Logout</NavItem>
          </LinkContainer>}
        </Nav>
        {userLabel && <p className={messageStyle}>Logged in as <strong>{userLabel}</strong>.</p>}
        {loggingIn && <p className={messageStyle}>Logging In..</p>}
        {loggingOut && <p className={messageStyle}>Logging Out..</p>}
      </Navbar.Collapse>
    </Navbar>
  );
};

TopNav.propTypes = {
  userLabel: PropTypes.string,
  loggingIn: PropTypes.bool,
  loggingOut: PropTypes.bool,
};

export default TopNav;
