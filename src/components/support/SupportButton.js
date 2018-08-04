import React from 'react';
import Button from '@material-ui/core/Button';
import SecurityOutlined from '@material-ui/icons/SecurityOutlined';
import Tooltip from '../tooltip';

export default props => {
  return (
    <Tooltip title="2nd Support Person" placement="top">
      <Button
        variant="fab"
        color="secondary"
        aria-label="Support"
        onClick={props.clickHandler}
      >
        <SecurityOutlined />
      </Button>
    </Tooltip>
  );
};
