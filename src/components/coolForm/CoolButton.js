import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// nodejs library to set properties for components
import { bool, oneOf, string, object } from 'prop-types';

// material-ui components
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';

import { buttonStyle } from '../../assets/jss';

function RegularButton({ ...props }) {
  const {
    classes,
    color,
    round,
    children,
    disabled,
    simple,
    size,
    block,
    link,
    justIcon,
    className,
    muiClasses,
    ...rest
  } = props;
  const btnClasses = classNames({
    [classes.button]: true,
    [classes[size]]: size,
    [classes[color]]: color,
    [classes.round]: round,
    [classes.disabled]: disabled,
    [classes.simple]: simple,
    [classes.block]: block,
    [classes.link]: link,
    [classes.justIcon]: justIcon,
    [className]: className
  });
  return (
    <Button {...rest} classes={muiClasses} className={btnClasses}>
      {children}
    </Button>
  );
}

RegularButton.propTypes = {
  classes: object.isRequired,
  color: oneOf([
    'primary',
    'info',
    'success',
    'warning',
    'danger',
    'rose',
    'white',
    'transparent'
  ]),
  size: oneOf(['sm', 'lg']),
  simple: bool,
  round: bool,
  disabled: bool,
  block: bool,
  link: bool,
  justIcon: bool,
  className: string,
  // use this to pass the classes props from Material-UI
  muiClasses: object
};

export default withStyles(buttonStyle)(RegularButton);
