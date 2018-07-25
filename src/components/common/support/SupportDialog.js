import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import blue from '@material-ui/core/colors/blue';
import { SecurityOutlined } from '@material-ui/icons';

import PersonSummaryCard from '../../people/PersonSummaryCard';
import { currentSupportPerson } from '../../../graphql';

const styles = theme => ({
  appBar: {
    position: 'relative'
  },
  flex1: {
    flex: 1
  },
  button: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  }
});

class SupportDialog extends PureComponent {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    setTimeout(() => {
      window.location.href = '/person/' + value.person.id;
    }, 500);
    this.props.onClose(value);
  };

  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;
    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="simple-dialog-title"
        {...other}
      >
        <DialogTitle id="simple-dialog-title">
          2nd Line Support Person
        </DialogTitle>
        <div>
          {selectedValue && selectedValue.person ? (
            <div onClick={() => this.handleListItemClick(selectedValue)}>
              <PersonSummaryCard person={selectedValue.person} />
            </div>
          ) : null}
        </div>
      </Dialog>
    );
  }
}

SupportDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.object
};

const SimpleDialogWrapped = withStyles(styles)(SupportDialog);

class SimpleDialogDemo extends PureComponent {
  state = {
    selectedValue: null,
    open: false,
    fetching: true,
    extensions: null
  };

  handleFetchingSupportPerson = async () => {
    const { client } = this.props;

    this.setState({
      selectedValue: null,
      open: false,
      fetching: true,
      extensions: null
    });

    const result = await client.query({
      query: currentSupportPerson
    });

    if (result.errors) {
      this.setState({
        selectedValue: null,
        open: true,
        fetching: false,
        extensions: result.extensions
      });
      return;
    }

    this.setState({
      selectedValue: result.data.watcher,
      open: true,
      fetching: false,
      extensions: result.extensions
    });
  };

  handleClickOpen = async () => {
    this.setState({ open: true });
    await this.handleFetchingSupportPerson();
  };

  handleClose = value => {
    this.setState({ selectedValue: value, open: false });
  };

  render() {
    return (
      <div>
        <Button
          variant="fab"
          color="primary"
          aria-label="Support"
          onClick={this.handleClickOpen}
        >
          <SecurityOutlined />
        </Button>
        <SimpleDialogWrapped
          selectedValue={this.state.selectedValue ? this.state.selectedValue : null}
          open={this.state.open}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

export default withApollo(SimpleDialogDemo);
