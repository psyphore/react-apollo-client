import React, { Fragment } from 'react';
import { bool, string, func, number, object } from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const SnackBar = ({ open, message, duration, anchor, closeHandler }) => {
  const ao = anchor || {
      vertical: 'bottom',
      horizontal: 'left'
    },
    dur = duration || 6000,
    cp = {
      'aria-describedby': 'message-id'
    },
    msg = <span id="message-id">{message}</span>;

  return (
    <Fragment>
      <Snackbar
        anchorOrigin={ao}
        open={open}
        autoHideDuration={dur}
        onClose={closeHandler}
        ContentProps={cp}
        message={msg}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={closeHandler}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    </Fragment>
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
