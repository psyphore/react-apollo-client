import React from 'react';
import { object } from 'prop-types';
import { Router } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { primaryTheme } from './themes/primary-theme';
import { AppHeader, AppFooter } from './components';
import AppRoutes from './routes/index.routes';
import { history } from './services/';
import { AppConsumer } from './HOC';

const styles = theme => ({
  container: {
    display: 'grid',
    gridGap: '5px',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr auto 1fr',
    width: '100vw',
    maxWidth: '100vw',
    margin: '0 auto',
    [theme.breakpoints.down('md')]: { maxWidth: '100vw' },
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

const App = ({ classes }) => (
  <MuiThemeProvider theme={primaryTheme}>
    <CssBaseline />
    <AppConsumer>
      {({ title }) => (
        <Router history={history}>
          <div className={classes.container}>
            <div className={classes.header}>
              <AppHeader title={title} />
            </div>
            <div className={classes.content}>
              <AppRoutes />
            </div>
            <div className={classes.footer}>
              <AppFooter title={title} />
            </div>
          </div>
        </Router>
      )}
    </AppConsumer>
  </MuiThemeProvider>
);

App.propTypes = {
  classes: object
};

export default withStyles(styles)(App);
