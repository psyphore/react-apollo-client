import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import './index.css';

const styles = theme => ({
  root: {
    display: 'flex'
  },
  paper: {
    marginRight: theme.spacing.unit * 2
  },
  popperClose: {
    pointerEvents: 'none'
  },
  button: {
    margin: theme.spacing.unit
  }
});

class MenuListComposition extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className="">
        <NavLink to="/" as="home">
          <Button variant="outlined" color="primary" className={classes.button}>
            Home
          </Button>
        </NavLink>

        <NavLink to="/buildings/4/0" as="regions">
          <Button variant="outlined" className={classes.button}>
            Building
          </Button>
        </NavLink>

        <NavLink to="/people/10/0" as="peeps">
          <Button variant="outlined" className={classes.button}>
            Peeps
          </Button>
        </NavLink>

        <NavLink to="/me/p41" as="me">
          <Button
            variant="outlined"
            color="secondary"
            className={classes.button}
          >
            My Profile
          </Button>
        </NavLink>
      </div>
    );
  }
}

const AppMenuHeader = withStyles(styles)(MenuListComposition);
export default AppMenuHeader;
