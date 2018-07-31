import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { NavLink } from 'react-router-dom';
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

function AppHeaderBar(props) {
  return (
    <div className={props.classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div className={props.classes.flex}>
            <Button component={NavLink} to="/">
              {props.title}
            </Button>
          </div>
          <div className={props.classes.row}>
            <Support />
            <ProfileButton />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

AppHeaderBar.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
};

const AppHeader = withStyles(styles)(AppHeaderBar);
export default AppHeader;
