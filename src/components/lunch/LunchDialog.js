import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
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
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';

const styles = {
  appBar: {
    position: 'relative'
  },
  flex: {
    flex: 1
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends PureComponent {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handlePlaceOrder = () => {
    // do some fency stuff here
    this.handleClose();
  };

  render() {
    const { classes, detail } = this.props;

    return (
      <div>
        <Button
          variant="fab"
          color="primary"
          aria-label="Lunch"
          onClick={this.handleClickOpen}
        >
          <AddShoppingCart />
        </Button>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={this.handleClose}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
              <Typography
                variant="title"
                color="inherit"
                className={classes.flex}
              >
                {detail.title}
              </Typography>
              <Button color="inherit" onClick={this.handlePlaceOrder}>
                Save
              </Button>
            </Toolbar>
          </AppBar>
          <List>
            <ListItem>
              <ListItemText primary="meal of the day" secondary={detail.main} />
            </ListItem>
            <ListItem>
              <ListItemText primary="vegiterian meal" secondary={detail.veg} />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="custom" secondary="???" />
            </ListItem>
          </List>
        </Dialog>
      </div>
    );
  }
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  detail: PropTypes.object.isRequired
};

const LunchDialog = withStyles(styles)(FullScreenDialog);
export default LunchDialog;
