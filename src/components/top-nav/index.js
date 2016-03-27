import React, { PropTypes } from 'react';

import NavIcon from '../icons/nav-icon';

import sty from './index.css';

const TopNavApp = ({ userState, userLabel, logOut, toggleLeftMenu }) => {
  const logOutButton = userState.data
    ? <a href="#" className={sty.link} onClick={logOut}>Log Out</a>
    : undefined;

  return (
    <div className={sty.navBar}>
      {logOutButton}
      <a href="#" className={sty.leftMenuButton} onClick={toggleLeftMenu}><NavIcon /></a>
      <span className={sty.brand}>React Startup Starter</span>
      <span className={sty.loginStatus}>
        {userLabel &&
          <span className={sty.message}>
            Logged in as: <span className={sty.userId}>{userLabel}</span>
          </span>
        }
        {userState.loading && <span className={sty.message}>Loading..</span>}
        {userState.loggingIn && <span className={sty.message}>Logging In..</span>}
        {userState.loggingOut && <span className={sty.message}> Logging Out.. </span>}
      </span>
    </div>
  );
};

TopNavApp.propTypes = {
  userState: PropTypes.object,
  userLabel: PropTypes.string,
  logOut: PropTypes.func,
  toggleLeftMenu: PropTypes.func,
};

export default TopNavApp;
