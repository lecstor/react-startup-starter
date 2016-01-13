import React, { Component, PropTypes } from 'react';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

// Export bare component for testing
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export default class TopNav extends Component {
  render () {
    const { userLabel, loggingIn, loggingOut } = this.props;
    const styles = require('./style.scss');

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
          {userLabel &&
          <p className={styles.loggedInMessage + ' navbar-text'}>Logged in as <strong>{userLabel}</strong>.</p>}
          {loggingIn &&
          <p className={styles.loggedInMessage + ' navbar-text'}>Logging In..</p>}
          {loggingOut &&
          <p className={styles.loggedInMessage + ' navbar-text'}>Logging Out..</p>}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

TopNav.propTypes = {
  userLabel: PropTypes.string,
  loggingIn: PropTypes.bool,
  loggingOut: PropTypes.bool,
};

