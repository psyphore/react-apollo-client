import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

import { primaryTheme } from './themes/primary-theme';
import { AppHeader } from './components/common';
import AppRoutes from './routes/index.routes';

const styles = theme => ({
  container: {
    display: 'grid',
    gridGap: '5px',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr auto 1fr'
  },
  header: {
    gridRow: '-1 / 2'
  },
  content: {
    gridRow: '2 / 3',
    margin: '1%'
  },
  footer: {
    gridRow: '3 / 4'
  },
  divider: {
    margin: `${theme.spacing.unit * 2}px 0`
  }
});

class App extends Component {
  render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={primaryTheme}>
        <CssBaseline />
        <div className={classes.container}>
          <Router>
            <div>
              <div className={classes.header}>
                <AppHeader title={process.env.REACT_APP_NAME} />
              </div>
              <div className={classes.content}>
                <AppRoutes />
              </div>
              <div className={classes.footer}>
                <Divider className={classes.divider} />
                <p>this is a footer</p>
              </div>
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(App);
