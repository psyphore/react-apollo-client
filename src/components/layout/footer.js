import React from 'react';
import { string, object } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Moment from 'react-moment';

const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

const AppFooterBar = ({ classes, title }) => (
  <div className={classes.root}>
    <Divider />
    <Typography variant="subheading" gutterBottom>
      {title + ' - '}
      <Moment format="YYYY">{new Date()}</Moment>
    </Typography>
  </div>
);

AppFooterBar.propTypes = {
  title: string.isRequired,
  classes: object.isRequired
};

export default withStyles(styles)(AppFooterBar);
