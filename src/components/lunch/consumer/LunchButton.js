import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import Tooltip from '../../tooltip';

export default ({ clickHandler }) => (
  <Tooltip title="Manage Your Lunch" placement="top">
    <Fab aria-label="Lunch" color="primary" onClick={clickHandler}>
      <AddShoppingCart color="action" />
    </Fab>
  </Tooltip>
);
