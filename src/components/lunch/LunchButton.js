import React from 'react';
import Button from '@material-ui/core/Button';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import Tooltip from '../tooltip';

export default ({ clickHandler }) => (
  <Tooltip title="Manage Your Lunch" placement="top">
    <Button
      aria-label="Lunch"
      color="primary"
      onClick={clickHandler}
      variant="fab"
    >
      <AddShoppingCart />
    </Button>
  </Tooltip>
);
