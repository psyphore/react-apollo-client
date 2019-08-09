import React, { Fragment, PureComponent, Component } from 'react';
import { object } from 'prop-types';
import { Mutation } from 'react-apollo';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import EditSharp from '@material-ui/icons/EditSharp';

import { profileEditDialogStyle } from '../../assets/jss';

import { Input, Card, Header, Body, Footer, Avatar, Button } from '../coolForm';
import { updateMe } from '../../graphql';

const baseUrl = `${process.env.REACT_APP_GRAPHQL_URI}/media/`,
  width = 200,
  height = 200;

const LunchManagerContent = ({ detail, actions: { handleInputChange } }) => {
  <Grid container spacing={8}>
    <Grid item md={12} />
  </Grid>;
};

const DialogAvatar = ({ detail }) => <Avatar style={{ marginTop: 'auto' }} />;

const DialogCard = ({ state, classes, actions, mutator }) => {
  const dateValue = ``;

  return (
    <Card id="lunch-manager-form">
      <Header color="primary" />
      <Body>
        <DialogContent>
          <LunchManagerContent
            detail={state}
            classes={classes}
            actions={actions}
          />
        </DialogContent>
      </Body>
      <Footer>
        <Button>Cancel</Button>
        <Button color="primary">Save</Button>
      </Footer>
    </Card>
  );
};

class LunchManagerDialog extends Component {
  static propTypes = {
    classes: object.isRequired,
    detail: object.isRequired
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;
    const actions = {
      handleInputChange: this.handleInputChange,
      update: this.update,
      close: this.handleClose
    };

    return (
      <Fragment>
        <Fab
          aria-label="Edit Profile"
          color="primary"
          onClick={this.handleClickOpen}
        >
          <EditSharp color="action" />
        </Fab>

        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          fullScreen={false}
          maxWidth="md"
        >
          <Mutation mutation={updateMe}>
            {updateMe => (
              <DialogCard
                classes={classes}
                state={this.state}
                actions={actions}
                mutator={updateMe}
              />
            )}
          </Mutation>
        </Dialog>
      </Fragment>
    );
  }
}

export default withStyles(profileEditDialogStyle)(LunchManagerDialog);
