import React, { Fragment } from 'react';
import { object, string } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import { Support } from '../support/';
import ProfileButton from '../people/ProfileButton';
import SearchButton from '../search/SearchButton';
import { AppConsumer } from '../../HOC';
import { LunchManager } from '../lunch';

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  row: {
    display: 'flex',
    justifyContent: 'space-evenly',
    margin: '0 auto 0 auto',
    padding: '0 auto 0 auto'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  links: {
    textDecoration: 'none'
  }
};

const AppHeaderBar = ({ classes, title }) => (
  <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <div className={classes.flex}>
          <Button component={NavLink} to="/">
            {title}
          </Button>
        </div>
        <div className={classes.row}>
          <AppConsumer>
            {({ auth }) => (
              <Fragment>
                {auth().isAuthenticated() && (
                  <Fragment>
                    <LunchManager />
                    <SearchButton />
                    <Support />
                    <ProfileButton />
                  </Fragment>
                )}
              </Fragment>
            )}
          </AppConsumer>
        </div>
      </Toolbar>
    </AppBar>
  </div>
);

AppHeaderBar.propTypes = {
  classes: object.isRequired,
  title: string.isRequired
};

export default withStyles(styles)(AppHeaderBar);
