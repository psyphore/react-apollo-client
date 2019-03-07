import React from 'react';
import { IconButton, Snackbar } from '@material-ui/core';
import Close from '@material-ui/icons/Close';

import { SharedSnackbarConsumer } from './SnackBarProvider';

const SharedSnackbar = () => (
  <SharedSnackbarConsumer>
    {({ snackbarIsOpen, message, closeSnackbar }) => (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={snackbarIsOpen}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        message={message}
        action={[
          <IconButton key="close" color="inherit" onClick={closeSnackbar}>
            <Close color="action" />
          </IconButton>
        ]}
      />
    )}
  </SharedSnackbarConsumer>
);

export default SharedSnackbar;
