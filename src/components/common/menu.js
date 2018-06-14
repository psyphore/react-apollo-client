import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { NavLink } from "react-router-dom";

const styles = theme => ({
    root: {
      display: 'flex',
    },
    paper: {
      marginRight: theme.spacing.unit * 2,
    },
    popperClose: {
      pointerEvents: 'none',
    },
    button: {
      margin: theme.spacing.unit,
    },
  });

  class MenuListComposition extends React.Component {
    state = {
      open: false,
    };
  
    render() {
      const { classes } = this.props;
  
      return (
        <div className={classes.root}>
          <NavLink to="/" as="home">
            <Button variant="outlined" color="primary" className={classes.button}>Home</Button>
          </NavLink>

          <NavLink to="/regions/10/0" as="regions">
            <Button variant="outlined" className={classes.button}>Regions</Button>
          </NavLink>

          <NavLink to="/people/60/0" as="peeps">
            <Button variant="outlined" className={classes.button}>Peeps</Button>
          </NavLink>
          
          <NavLink to="/person/Sipho/Hlophe" as="me">
            <Button variant="outlined" color="secondary" className={classes.button}>My Profile</Button>              
          </NavLink>
        </div>
      );
    }
  }

const AppMenuHeader = withStyles(styles)(MenuListComposition);
export default AppMenuHeader;
