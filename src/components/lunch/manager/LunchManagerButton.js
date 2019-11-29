import React from 'react';
import Fab from '@material-ui/core/Fab';
import Receipt from '@material-ui/icons/Receipt';
import Tooltip from '../../tooltip';

export default ({ clickHandler }) => (
  <Tooltip title="Manage Available Lunch Options" placement="top">
    <Fab aria-label="Lunch Manager" color="secondary" onClick={clickHandler}>
      <Receipt color="action" />
    </Fab>
  </Tooltip>
);
