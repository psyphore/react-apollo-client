import React from 'react';
import Button from '@material-ui/core/Button';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import Tooltip from '../tooltip';

export default props => {
  return (
    <Tooltip title="Manage Your Lunch" placement="top">
      <Button
        variant="fab"
        color="primary"
        aria-label="Lunch"
        onClick={props.clickHandler}
      >
        <AddShoppingCart />
      </Button>
    </Tooltip>
  );
};
