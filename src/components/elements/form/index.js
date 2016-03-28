import React, { PropTypes } from 'react';
import merge from 'lodash/merge';
import pick from 'lodash/pick';

import sty from './index.css';

const Form = (props) => {
  const { className = 'form', styles } = props;
  const passThrough = pick(props, 'onSubmit');
  const stys = merge({}, sty, styles);

  return (
    <form className={stys[className]} {...passThrough}>
      {props.children}
    </form>
  );
};

Form.propTypes = {
  styles: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node,
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
