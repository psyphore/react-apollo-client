import React from 'react';
import Fab from '@material-ui/core/Fab';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Tooltip from '../../tooltip';

export default ({ clickHandler }) => (
  <Tooltip title="Manage Lunch Options" placement="top">
    <Fab aria-label="Lunch" color="primary" onClick={clickHandler}>
      <ShoppingCart color="action" />
    </Fab>
  </Tooltip>
);
