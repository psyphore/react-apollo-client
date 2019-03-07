import React from 'react';
import classNames from 'classnames';
import { object, node, string, bool } from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
// core components
import { inputStyle } from '../../assets/jss';

function CustomFileInput({ ...props }) {
  const {
    classes,
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    success
  } = props;

  const labelClasses = classNames({
    [' ' + classes.labelRootError]: error,
    [' ' + classes.labelRootSuccess]: success && !error
  });

  return (
    <FormControl
      {...formControlProps}
      className={formControlProps.className + ' ' + classes.formControl}
    >
      {labelText !== undefined ? (
        <InputLabel
          className={classes.labelRoot + labelClasses}
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      ) : null}

      <Button containerElement="label" label={labelText} fab>
        <input id={id} {...inputProps} />
      </Button>
    </FormControl>
  );
}

CustomFileInput.propTypes = {
  classes: object.isRequired,
  labelText: node,
  labelProps: object,
  id: string,
  inputProps: object,
  formControlProps: object,
  error: bool,
  success: bool
};

export default withStyles(inputStyle)(CustomFileInput);
