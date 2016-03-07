import React, { PropTypes } from 'react';
import { IndexLink } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

const TopNavApp = ({ userLabel, loggingOut }) => {
  const styles = require('./style.scss');
  const messageStyle = `${styles.loggedInMessage} navbar-text`;

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
        {userLabel && <p className={messageStyle}> Logged in as <strong>{userLabel}</strong>. </p>}
        {loggingOut && <p className={messageStyle}> Logging Out.. </p>}
      </Navbar.Collapse>
    </Navbar>
  );
};

TopNavApp.propTypes = {
  userLabel: PropTypes.string,
  loggingOut: PropTypes.bool,
};

export default TopNavApp;
