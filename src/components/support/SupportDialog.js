import React, { PureComponent } from 'react';
import { object, func } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import PersonSummaryCard from '../people/PersonSummaryCard';

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
    backgroundColor: theme.palette.primary,
    color: theme.palette.secondary
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
        aria-labelledby="support-dialog"
        onClose={this.handleClose}
        {...other}
      >
        <DialogTitle id="support-dialog">2nd Line Support Person</DialogTitle>
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
  classes: object.isRequired,
  onClose: func,
  selectedValue: object
};

export default withStyles(styles)(SupportDialog);
