import React, { PropTypes } from 'react';
import merge from 'lodash/merge';

import sty from './index.css';

const Alert = (props) => {
  const { type, styles } = props;
  const stys = merge({}, sty, styles);
  const className = {
    warning: 'alertWarning',
    error: 'alertError',
  }[type];

  return (
    <div className={stys[className]}>
      {props.children}
    </div>
  );
};

Alert.propTypes = {
  type: PropTypes.string,
  styles: PropTypes.object,
  children: PropTypes.node,
};

export default Alert;
