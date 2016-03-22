import React from 'react';
import { Link } from 'react-router';

import sty from './index.css';

const linkProps = {
  activeClassName: sty.activeLink,
  className: sty.link,
};

const SideNavApp = () => (
  <div className={sty.container}>
    <Link to="/user-details" {...linkProps}>Your Details</Link>
    <Link to="/apikeys" {...linkProps}>API Keys</Link>
  </div>
);

export default SideNavApp;
