import React from 'react';
import Button from '@material-ui/core/Button';
import CalendarToday from '@material-ui/icons/CalendarToday';
import Tooltip from '../tooltip';

export default props => {
  return (
    <Tooltip title="Manage Your Leave" placement="top">
      <Button
        variant="fab"
        color="primary"
        aria-label="Lunch"
        onClick={props.clickHandler}
      >
        <CalendarToday />
      </Button>
    </Tooltip>
  );
};
