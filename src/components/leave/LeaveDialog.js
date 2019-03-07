import React, { Fragment } from 'react';
import { object } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Link from 'react-router-dom/Link';

import { LeaveContext } from '../../HOC';
import SlideUp from '../transitions/SlideUp';

const styles = {
  appBar: {
    position: 'relative'
  },
  flex: {
    flex: 1
  }
};

const FullScreenDialog = ({ classes }) => (
  <Fragment>
    <LeaveContext.Consumer>
      {({ state, actions, person }) => (
        <Dialog
          fullScreen
          open={state.open}
          onClose={actions.handleClose}
          TransitionComponent={SlideUp}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={actions.handleClose}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
              <Typography
                variant="h6"
                color="inherit"
                className={classes.flex}
              >
                {person
                  ? person.firstname + ' ' + person.lastname
                  : 'no person loaded'}
              </Typography>
            </Toolbar>
          </AppBar>
          <List>
            <ListItem>
              <ListItemText
                primary="email"
                secondary={person ? person.email : ''}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="mobile"
                secondary={person ? person.mobile : ''}
              />
            </ListItem>
            <ListItem>
              {person ? <Link to={'/person/' + person.id}>View</Link> : null}
            </ListItem>
          </List>
        </Dialog>
      )}
    </LeaveContext.Consumer>
  </Fragment>
);

FullScreenDialog.propTypes = {
  classes: object.isRequired
};

export default withStyles(styles)(FullScreenDialog);
