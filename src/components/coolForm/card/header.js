import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// nodejs library to set properties for components
import { object, string, oneOf, bool } from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// @material-ui/icons

// core components
import { cardHeaderStyle } from '../../../assets/jss';

function CardHeader({ ...props }) {
  const {
    classes,
    className,
    children,
    color,
    plain,
    stats,
    icon,
    ...rest
  } = props;
  const cardHeaderClasses = classNames({
    [classes.cardHeader]: true,
    [classes[color + 'CardHeader']]: color,
    [classes.cardHeaderPlain]: plain,
    [classes.cardHeaderStats]: stats,
    [classes.cardHeaderIcon]: icon,
    [className]: className !== undefined
  });
  return (
    <div className={cardHeaderClasses} {...rest}>
      {children}
    </div>
  );
}

CardHeader.propTypes = {
  classes: object.isRequired,
  className: string,
  color: oneOf(['warning', 'success', 'danger', 'info', 'primary', 'rose']),
  plain: bool,
  stats: bool,
  icon: bool
};

export default withStyles(cardHeaderStyle)(CardHeader);
