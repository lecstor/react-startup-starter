import React, { PropTypes } from 'react';
import merge from 'lodash/merge';
import pick from 'lodash/pick';

import sty from './index.css';

const Button = (props) => {
  const { type, styles, className, floatRight } = props;
  const passThrough = pick(props, 'disabled', 'active', 'onClick');
  const stys = merge({}, sty, styles);

  if (floatRight) passThrough.style = { float: 'right' };

  return (
    <button className={className || stys[type]} {...passThrough}>
      {props.children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  styles: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired,
  floatRight: PropTypes.bool,
};

export default Button;
