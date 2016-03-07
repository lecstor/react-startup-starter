import React, { PropTypes } from 'react';

const Button = ({ className, onClick, label }) => (
  <button className={className} onClick={onClick}> {label} </button>
);

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string,
};

export default Button;
