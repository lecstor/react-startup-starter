import React, { PropTypes } from 'react';
import { IndexLink } from 'react-router';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

const TopNavApp = ({ userState, userLabel, logOut }) => {
  const styles = require('./style.scss');
  const messageStyle = `${styles.loggedInMessage} navbar-text`;

  return (
    <Navbar fixedTop className={styles.navbar}>
      <Navbar.Header>
        <Navbar.Brand className={styles.brand}>
          <IndexLink to="/">React Startup Starter App</IndexLink>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight navbar>
          {userLabel &&
            <NavItem onClick={logOut}>Log Out</NavItem>
          }
        </Nav>
        {userLabel && <p className={messageStyle}> Logged in as <strong>{userLabel}</strong>. </p>}
        {userState.loading && <p className={messageStyle}>Loading..</p>}
        {userState.loggingIn && <p className={messageStyle}>Logging In..</p>}
        {userState.loggingOut && <p className={messageStyle}> Logging Out.. </p>}
      </Navbar.Collapse>
    </Navbar>
  );
};

TopNavApp.propTypes = {
  userState: PropTypes.object,
  userLabel: PropTypes.string,
  logOut: PropTypes.func,
};

export default TopNavApp;
