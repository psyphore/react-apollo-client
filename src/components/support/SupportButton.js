import React from 'react';
import Fab from '@material-ui/core/Fab';
import SecurityOutlined from '@material-ui/icons/SecurityOutlined';

import Tooltip from '../tooltip';
import AppBarButtonLoader from '../loader/AppBarButtonLoader';

export default ({ clickHandler, loading }) => (
  <Tooltip title="2nd Support Person" placement="top">
    <Fab aria-label="Support" color="secondary" onClick={clickHandler}>
      {loading ? <AppBarButtonLoader /> : <SecurityOutlined color="action" />}
    </Fab>
  </Tooltip>
);
