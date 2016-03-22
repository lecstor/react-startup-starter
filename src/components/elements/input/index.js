import React, { PropTypes } from 'react';
import merge from 'lodash/merge';

import sty from './index.css';

const emailRegExp = /\w+@\w/;

const Input = (props) => {
  const { type, value, styles = {}, isError } = props;
  const stys = merge({}, sty, styles);

  let className = stys.input;
  if (type === 'password') {
    className = stys.password;
  }
  if (value) {
    if (type === 'email') {
      if (emailRegExp.test(value)) {
        className = stys.inputOk;
      } else {
        className = isError ? stys.inputError : stys.inputWarn;
      }
    } else {
      if (isError) {
        className = stys.inputError;
      }
    }
  }
  return (
    <input {...props} className={className} />
  );
};

Input.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  styles: PropTypes.object,
  isError: PropTypes.bool,
};

export default Input;
