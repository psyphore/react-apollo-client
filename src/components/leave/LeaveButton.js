import React from 'react';
import Button from '@material-ui/core/Button';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Tooltip from '../tooltip';

export default () => (
  <Tooltip title="Manage Your Leave (Coming soon)." placement="top">
    <Button
      variant="fab"
      color="primary"
      aria-label="Lunch"
      // onClick={props.clickHandler}
    >
      <CalendarToday />
    </Button>
  </Tooltip>
);
