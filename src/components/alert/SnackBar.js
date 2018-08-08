import React from 'react';
import { bool, string, func, number, object } from 'prop-types';
import { Snackbar } from '@material-ui/core';

const SnackBar = ({ open, message, duration, anchor, closeHandler }) => {
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
  open: bool.isRequired,
  message: string.isRequired,
  closeHandler: func.isRequired,
  duration: number,
  anchor: object
};

export default SnackBar;
