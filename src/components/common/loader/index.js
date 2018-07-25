import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  root: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    zIndex: 3
  },
  progress: {
    margin: theme.spacing.unit * 2,
    color: theme.palette.primary.light
  }
});

function CircularIndeterminate(props) {
  const { classes} = props;
  return (
    <div className={classes.root}>
      <CircularProgress
          className={classes.progress}
          thickness={7}
        />
    </div>
  );
}

CircularIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.string
};

export default withStyles(styles)(CircularIndeterminate);
