import React from 'react';
import { object, string } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import { Support } from '../support/';
import ProfileButton from '../people/ProfileButton';

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  row: {
    display: 'flex',
    justifyContent: 'center'
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
          <Support />
          <ProfileButton />
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
