// https://css-tricks.com/creating-svg-icon-system-react/
// https://raw.githubusercontent.com/driftyco/ionicons/master/src/navicon-round.svg

import React, { PropTypes } from 'react';

import stys from './index.css';

const NavIcon = ({
  width = '25px', height = '25px',
  color = 'rgb(55, 58, 60)',
  titleId = 'navIconTitle',
}) => (
  <svg className={stys.svg} version="1.1" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve"
    x="0px" y="0px" width={width} height={height} viewBox="0 0 512 512" aria-labelledby="title"
  >
    <title id={titleId}>Navigation Menu Icon</title>
    <path fill={color} d="M417.4,224H94.6C77.7,224,64,238.3,64,256c0,17.7,13.7,32,30.6,32h322.8c16.9,0,30.6-14.3,30.6-32
      C448,238.3,434.3,224,417.4,224z"
    />
    <path fill={color} d="M417.4,96H94.6C77.7,96,64,110.3,64,128c0,17.7,13.7,32,30.6,32h322.8c16.9,0,30.6-14.3,30.6-32
      C448,110.3,434.3,96,417.4,96z"
    />
    <path fill={color} d="M417.4,352H94.6C77.7,352,64,366.3,64,384c0,17.7,13.7,32,30.6,32h322.8c16.9,0,30.6-14.3,30.6-32
      C448,366.3,434.3,352,417.4,352z"
    />
  </svg>
);

NavIcon.propTypes = {
  titleId: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string,
};

export default NavIcon;
