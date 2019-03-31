import React, { Fragment, PureComponent } from 'react';
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

const EditDialogContent = ({ detail, actions: { handleInputChange } }) => (
  <Grid container spacing={8}>
    <Grid item xs={12} sm={12} md={6}>
      <Input
        id="person-firstnames"
        labelText="First names"
        formControlProps={{
          fullWidth: true,
          margin: 'dense'
        }}
        inputProps={{
          disabled: true,
          value: detail.firstname
        }}
      />
    </Grid>
    <Grid item xs={12} sm={12} md={6}>
      <Input
        id="person-lastname"
        labelText="Lastame"
        formControlProps={{
          fullWidth: true,
          margin: 'dense'
        }}
        inputProps={{
          disabled: true,
          value: detail.lastname
        }}
      />
    </Grid>
    <Grid item xs={12} sm={12} md={6}>
      <Input
        id="person-title"
        labelText="Title"
        formControlProps={{
          fullWidth: true,
          margin: 'dense'
        }}
        inputProps={{
          disabled: true,
          value: detail.title
        }}
      />
    </Grid>
    <Grid item xs={12} sm={12} md={6}>
      <Input
        id="person-knownas"
        labelText="Known As"
        formControlProps={{
          fullWidth: true,
          margin: 'dense'
        }}
        inputProps={{
          value: detail.knownAs,
          name: 'knownAs',
          type: 'text',
          onChange: e => handleInputChange(e)
        }}
      />
    </Grid>
    <Grid item xs={12} sm={12} md={6}>
      <Input
        id="person-email"
        labelText="Email"
        formControlProps={{
          fullWidth: true,
          margin: 'dense'
        }}
        inputProps={{
          value: detail.email,
          name: 'email',
          type: 'email',
          onChange: e => handleInputChange(e)
        }}
      />
    </Grid>
    <Grid item xs={12} sm={12} md={6}>
      <Input
        id="person-mobile"
        labelText="Mobile"
        formControlProps={{
          fullWidth: true,
          margin: 'dense'
        }}
        inputProps={{
          value: detail.mobile,
          name: 'mobile',
          type: 'tel',
          onChange: e => handleInputChange(e)
        }}
      />
    </Grid>
    <Grid item xs={12} sm={12} md={12}>
      <Input
        id="person-bio"
        labelText="About me"
        formControlProps={{
          fullWidth: true,
          margin: 'dense'
        }}
        inputProps={{
          multiline: true,
          value: detail.bio,
          name: 'bio',
          type: 'text',
          onChange: e => handleInputChange(e)
        }}
      />
    </Grid>
    <Grid item xs={12} sm={12} md={12}>
      <Input
        id="person-avatar"
        labelText="New Avatar"
        formControlProps={{
          fullWidth: true,
          margin: 'dense'
        }}
        inputProps={{
          name: 'newAvatar',
          type: 'file',
          accept: 'image/png, image/jpeg',
          onChange: e => handleInputChange(e)
        }}
      />
    </Grid>
  </Grid>
);

const DialogAvatar = ({ detail }) => (
  <Avatar profile style={{ marginTop: 'auto' }}>
    <img src={`${baseUrl + detail.avatar}/${width}/${height}`} alt="..." />
  </Avatar>
);

const DialogCard = ({ state, classes, actions, mutator }) => {
  const fullNames = `
      ${state.firstname} ${
    state.knownAs && state.knownAs.trim().length > 0
      ? ' (' + state.knownAs + ') '
      : ' '
  } ${state.lastname}`;
  const { close, update } = actions;
  return (
    <Card id="form-dialog-title" editProfile>
      <Header color="primary">
        <Grid container spacing={8} justify="center">
          <Grid item xs={12} sm={12} md={8}>
            <Typography variant="h5">{fullNames}</Typography>
            <Typography variant="caption" gutterBottom>
              Edit Profile
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <DialogAvatar detail={state} actions={actions} />
          </Grid>
        </Grid>
      </Header>
      <Body>
        <DialogContent>
          <EditDialogContent
            detail={state}
            classes={classes}
            actions={actions}
          />
        </DialogContent>
      </Body>
      <Footer>
        <Button onClick={() => close()}>Cancel</Button>
        <Button onClick={() => update(mutator)} color="primary">
          Save
        </Button>
      </Footer>
    </Card>
  );
};

class PersonEditDialog extends PureComponent {
  static propTypes = {
    classes: object.isRequired,
    detail: object.isRequired
  };

  state = {
    open: false,
    newAvatar: []
  };

  handleClickOpen = () => {
    this.clearState();
    this.mapToState();
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  clearState = () => {
    // console.log('clear dialog state');
    const { detail } = this.props;
    Object.keys(detail).map(key => {
      this.setState({ [key]: null });
      return key;
    });
  };

  mapToState = () => {
    const { detail } = this.props;
    Object.keys(detail).map(key => {
      // console.log(`mapping: ${key} = ${detail[key]}`);
      this.setState({ [key]: detail[key] });
      return key;
    });
  };

  update = async mutator => {
    const selectedFile = this.state.newAvatar[0];

    const {
      id,
      title,
      firstname,
      lastname,
      email,
      mobile,
      knownAs,
      bio
    } = this.state;

    const person = {
      id,
      title,
      firstname,
      lastname,
      email,
      mobile,
      knownAs,
      bio,
      avatarLink: selectedFile
        ? {
            label: 'Person',
            file: selectedFile
          }
        : null
    };

    const { data, error } = await mutator({
      variables: { person }
    });

    // close on done
    if (data) this.handleClose();
    if (error) console.error(error);
  };

  handleInputChange = event => {
    const { target } = event;
    const value =
      target.type === 'checkbox'
        ? target.checked
        : target.type === 'file'
        ? target.files
        : target.value;
    const name = target.name;

    if (target.type === 'file') {
      this.setState(() => ({
        [name]: [...value]
      }));
    } else {
      // console.log(`${name}:${value}`);
      this.setState(() => ({
        [name]: value
      }));
    }
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

export default withStyles(profileEditDialogStyle)(PersonEditDialog);
