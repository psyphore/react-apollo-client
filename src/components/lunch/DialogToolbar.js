import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
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
    <Button
      aria-label="Lunch"
      color="primary"
      onClick={placeOrder}
      variant="fab"
    >
      <AddIcon />
    </Button>
  </Toolbar>
);

export default DialogToolBar;
