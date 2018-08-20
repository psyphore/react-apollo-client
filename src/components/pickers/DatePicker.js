import React from 'react';
import { object, string, func } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  }
});

const DatePickers = ({ classes, defaultValue, label, onUpdate }) => (
  <form className={classes.container} noValidate>
    <TextField
      id="date"
      type="date"
      label={label}
      defaultValue={defaultValue}
      className={classes.textField}
      onChange={e => onUpdate(e.target.value)}
      InputLabelProps={{
        shrink: true
      }}
    />
  </form>
);

DatePickers.propTypes = {
  classes: object.isRequired,
  label: string,
  defaultValue: string,
  onUpdate: func
};

export default withStyles(styles)(DatePickers);
