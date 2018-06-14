import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { primaryTheme } from './themes/primary-theme';
import AppHeader from './components/common/layout-header';
import AppRoutes from './routes/index.routes';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
});

class App extends Component {
  render() {

    const { classes } = this.props

    return (
        <MuiThemeProvider theme={primaryTheme}>
          <CssBaseline />
          <Router>
            <div className={classes.root}>
              <Grid container spacing={12}>
                <Grid item xs={12}>
                  <AppHeader title={process.env.REACT_APP_NAME} /> 
                </Grid>
                <Grid item xs={12}>
                  <AppRoutes />
                </Grid>
              </Grid>
            </div>
          </Router>
        </MuiThemeProvider>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
