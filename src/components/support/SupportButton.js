import React from 'react';
import Button from '@material-ui/core/Button';
import SecurityOutlined from '@material-ui/icons/SecurityOutlined';

import Tooltip from '../tooltip';
import AppBarButtonLoader from '../loader/AppBarButtonLoader';

export default ({ clickHandler, loading }) => (
  <Tooltip title="2nd Support Person" placement="top">
    <Button
      aria-label="Support"
      color="secondary"
      onClick={clickHandler}
      variant="fab"
    >
      {loading ? <AppBarButtonLoader /> : <SecurityOutlined color="action" />}
    </Button>
  </Tooltip>
);
