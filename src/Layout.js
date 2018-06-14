import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { primaryTheme } from './themes/primary-theme';
import AppHeader from './components/common/layout-header';

const styles = {
  container: {
    minHeight: '100vh',
    background: 'url(//subtlepatterns.com/patterns/scribble_light.png)',
    fontFamily: 'Calluna, Arial, sans-serif',
  },
  children: {
    marginTop: '2em',
  },
};

const Layout = ({ children }) => (
    <MuiThemeProvider theme={primaryTheme}>
    <CssBaseline />
    <Router>
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <AppHeader title={process.env.REACT_APP_NAME} /> 
          </Grid>
          <Grid item xs={12}>
            <div style={styles.children}>
                {children}
            </div>
          </Grid>
        </Grid>
      </div>
    </Router>
  </MuiThemeProvider>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default withRouter(Layout);