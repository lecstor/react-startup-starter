// https://css-tricks.com/creating-svg-icon-system-react/
// https://raw.githubusercontent.com/driftyco/ionicons/master/src/nuclear.svg

import React, { PropTypes } from 'react';

import sty from './index.css';

const Nuclear = ({
  width = '25px', height = '25px',
  color = 'rgb(55, 58, 60)',
  titleId = 'navIconTitle',
}) => (
  <svg className={sty.svg} version="1.1" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve"
    x="0px" y="0px" width={width} height={height} viewBox="0 0 512 512" aria-labelledby="title"
  >
    <title id={titleId}>Nuclea Icon</title>
    <g>
      <circle fill={color} cx="256" cy="272" r="48"/>
      <circle fill={color} cx="256" cy="272" r="48"/>
    </g>
    <g>
      <path fill={color} d="M480,272H320c0,23.9-13.1,44.7-32.6,55.7L365.6,464C433.1,425.4,480,355.3,480,272z"/>
      <path fill={color} d="M256,208c11.7,0,22.7,3.2,32.1,8.7l80.6-138.3C335.6,59.1,297.1,48,256,48c-41.2,0-79.9,11.2-113.1,30.6l79.8,138.8
        C232.4,211.4,243.8,208,256,208z"/>
      <path fill={color} d="M192,272H32c0,83.3,46.9,153.4,114.4,192l78.2-136.3C205.1,316.7,192,295.9,192,272z"/>
    </g>
  </svg>
);

Nuclear.propTypes = {
  titleId: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string,
};

export default Nuclear;
