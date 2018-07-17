import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import * as moment from 'moment';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  container: {
    display: 'grid',
    gridGap: '5px',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr',
    width: '100vw',
    maxWidth: '95vw',
    margin: '0 auto',
    [theme.breakpoints.down('md')]: { maxWidth: '85vw' },
    [theme.breakpoints.down('sm')]: { maxWidth: '95vw' }
  },
  footer: {
    gridRow: '-1 / 1',
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary

  },
  divider: {
    margin: `${theme.spacing.unit * 2}px 0`
  }
});

class Footer extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <Divider />
        <p className={classes.footer}>Cardinal - {moment().format('YYYY')}</p>
      </div>
    );
  }
}

export default withStyles(styles)(Footer);
