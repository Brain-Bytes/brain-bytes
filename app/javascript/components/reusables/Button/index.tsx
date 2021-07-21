import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/fontawesome-svg-core';

const Button = (props: { className: string, text: string, action: () => void, icon: string }) => (
  <button type="button" className={`rounded cursor-pointer ${props.className}`} onClick={props.action}>
    {props.icon && <FontAwesomeIcon className="mr-2" icon={props.icon as IconName} />}
    {props.text}
  </button>
);

Button.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  icon: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.bool,
  ]),
};

Button.defaultProps = {
  className: '',
  icon: false,
};

export default Button;
