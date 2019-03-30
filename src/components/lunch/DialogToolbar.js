import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const DialogToolBar = ({
  actions: { close, placeOrder },
  classes: { flex },
  state: { today }
}) => (
  <Toolbar>
    <IconButton color="inherit" aria-label="Close" onClick={close}>
      <CloseIcon />
    </IconButton>
    <Typography variant="h6" color="inherit" className={flex}>
      {`${
        today ? today.format('DD MMMM YYYY') + ' -' : ''
      } Place Your Lunch Order`}
    </Typography>
    <Fab aria-label="Lunch" color="primary" onClick={placeOrder}>
      <AddIcon />
    </Fab>
  </Toolbar>
);

export default DialogToolBar;
