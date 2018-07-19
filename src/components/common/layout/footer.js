import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import * as moment from 'moment';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  divider: {
    margin: `${theme.spacing.unit * 2}px 0`
  }
});

class AppFooter extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Divider />
        <p >Cardinal - {moment().format('YYYY')}</p>
      </div>
    );
  }
}

export default withStyles(styles)(AppFooter);
