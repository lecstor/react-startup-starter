import React, { Component, PropTypes } from 'react';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

// Export bare component for testing
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export default class TopNavApp extends Component {
  render () {
    const styles = require('./style.scss');
    const { user, loggingOut } = this.props;

    return (
      <Navbar fixedTop className={styles.navbar}>
        <Navbar.Header>
          <Navbar.Brand className={styles.brand}>
            <IndexLink to="/app"> React Startup Starter App</IndexLink>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight navbar>
            <LinkContainer to="/logout">
              <NavItem>Log Out</NavItem>
            </LinkContainer>
          </Nav>
          {user &&
          <p className={styles.loggedInMessage + ' navbar-text'}>Logged in as <strong>{user.email}</strong>.</p>}
          {loggingOut &&
          <p className={styles.loggedInMessage + ' navbar-text'}>Logging Out..</p>}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

TopNavApp.propTypes = {
  user: PropTypes.object,
  loggingOut: PropTypes.bool,
};
