import React from 'react';
import { object } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  root: {
    position: 'absolute',
    top: '-13%',
    left: '-13%',
    zIndex: 3
  },
  progress: {
    margin: theme.spacing.unit * 2,
    color: theme.palette.primary.light
  }
});

const AppBarButtonLoader = ({ classes }) => (
  <div className={classes.root}>
    <CircularProgress className={classes.progress} thickness={5} />
  </div>
);

AppBarButtonLoader.propTypes = {
  classes: object.isRequired
};

export default withStyles(styles)(AppBarButtonLoader);
