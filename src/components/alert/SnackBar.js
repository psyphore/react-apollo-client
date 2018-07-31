import React from 'react';
import PropTypes from 'prop-types';
import { Snackbar } from '@material-ui/core';

const SnackBar = props => {
  const { open, message, duration, anchor, closeHandler } = props;
  const ao = anchor || {
      vertical: 'bottom',
      horizontal: 'left'
    },
    dur = duration || 6000,
    cp = {
      'aria-describedBy': 'message-id'
    },
    msg = <span id="message-id">{message}</span>;

  return (
    <div>
      <Snackbar
        anchorOrigin={ao}
        open={open}
        autoHideDuration={dur}
        onClose={closeHandler}
        ContentProps={cp}
        message={msg}
      />
    </div>
  );
};

SnackBar.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  closeHandler: PropTypes.func.isRequired,
  duration: PropTypes.number,
  anchor: PropTypes.object
};

export default SnackBar;
