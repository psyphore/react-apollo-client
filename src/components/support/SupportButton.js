import React from 'react';
import Button from '@material-ui/core/Button';
import SecurityOutlined from '@material-ui/icons/SecurityOutlined';

export default props => {
  return (
    <Button
      variant="fab"
      color="secondary"
      aria-label="Support"
      onClick={props.clickHandler}
    >
      <SecurityOutlined />
    </Button>
  );
};
