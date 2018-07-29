import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import SimpleDialogDemo from '../support/SupportDialog';
import ProfileButton from '../../people/ProfileButton';

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

class ButtonAppBar extends Component {
  render() {
    const { title, classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <div className={classes.flex}>
              <Button component={NavLink} to="/">
                {title}
              </Button>
            </div>
            <div className={classes.row}>
              <SimpleDialogDemo />
              <ProfileButton />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
};

const AppHeader = withStyles(styles)(ButtonAppBar);
export default AppHeader;
