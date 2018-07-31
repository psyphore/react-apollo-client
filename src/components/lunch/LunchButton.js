import React from 'react';
import Button from '@material-ui/core/Button';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';

export default props => {
  return (
    <Button
      variant="fab"
      color="primary"
      aria-label="Lunch"
      onClick={props.clickHandler}
    >
      <AddShoppingCart />
    </Button>
  );
};
