import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Router } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { primaryTheme } from './themes/primary-theme';
import { AppHeader, AppFooter } from './components/common';
import AppRoutes from './routes/index.routes';
import { history } from './services/';

const styles = theme => ({
  container: {
    display: 'grid',
    gridGap: '5px',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr auto 1fr',
    width: '100vw',
    maxWidth: '95vw',
    margin: '0 auto',
    [theme.breakpoints.down('md')]: { maxWidth: '85vw' },
    [theme.breakpoints.down('sm')]: { maxWidth: '95vw' }
  },
  header: {
    gridRow: '-1 / 0'
  },
  content: {
    gridRow: '2 / 3',
    margin: '1%'
  },
  footer: {
    gridRow: '3 / 3',
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
});

class App extends Component {
  render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={primaryTheme}>
        <CssBaseline />
        <Router history={history}>
          <div className={classes.container}>
            <div className={classes.header}>
              <AppHeader title={process.env.REACT_APP_NAME} />
            </div>
            <div className={classes.content}>
              <AppRoutes />
            </div>
            <div className={classes.footer}>
              <AppFooter title={process.env.REACT_APP_NAME} />
            </div>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(App);
