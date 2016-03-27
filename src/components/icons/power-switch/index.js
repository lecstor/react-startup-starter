// https://css-tricks.com/creating-svg-icon-system-react/
// https://raw.githubusercontent.com/driftyco/ionicons/master/src/power.svg

import React, { PropTypes } from 'react';

import sty from './index.css';

const PowerSwitch = ({
  width = '25px', height = '25px',
  color = 'rgb(55, 58, 60)',
  titleId = 'navIconTitle',
}) => (
  <svg className={sty.svg} version="1.1" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve"
    x="0px" y="0px" width={width} height={height} viewBox="0 0 512 512" aria-labelledby="title"
  >
    <title id={titleId}>Power Switch Icon</title>
    <path fill={color} d="M256,256c-17.7,0-32-14.3-32-32V64c0-17.7,14.3-32,32-32s32,14.3,32,32v160C288,241.7,273.7,256,256,256z"/>
    <path fill={color} d="M379,68.8L379,68.8c-5-3-10.8-4.8-17-4.8c-17.7,0-32,14.3-32,32c0,6.2,1.8,12,4.8,16.9c2,3.2,4.6,6.1,7.6,8.4
      c1.2,0.9,2.4,1.7,3.7,2.5c8.1,5.6,15.8,11.9,23,19.1C399.4,173.1,416,213.3,416,256c0,42.7-16.6,82.9-46.9,113.1
      C338.9,399.4,298.7,416,256,416c-42.7,0-82.9-16.6-113.1-46.9C112.6,338.9,96,298.7,96,256c0-42.7,16.6-82.9,46.9-113.1
      c7.1-7.1,14.8-13.5,22.9-19c1.4-0.8,2.6-1.6,3.9-2.6c3-2.3,5.5-5.1,7.5-8.3c3.1-4.9,4.8-10.7,4.8-16.9c0-17.7-14.3-32-32-32
      c-6.2,0-12,1.8-16.9,4.8l-0.1-0.1C72.2,108.8,32,177.7,32,256c0,123.7,100.3,224,224,224c123.7,0,224-100.3,224-224
      C480,177.7,439.8,108.8,379,68.8z"
    />
  </svg>
);

PowerSwitch.propTypes = {
  titleId: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string,
};

export default PowerSwitch;
