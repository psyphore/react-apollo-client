import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import * as moment from 'moment';

const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

class AppFooter extends Component {
  render() {
    const { classes, title } = this.props;

    return (
      <div className={classes.root}>
        <Divider />
        <Typography variant="subheading" gutterBottom>
          {title + ' - '+ moment().format('YYYY')}
        </Typography>
      </div>
    );
  }
}

export default withStyles(styles)(AppFooter);
