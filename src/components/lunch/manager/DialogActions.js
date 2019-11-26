import React from 'react';
import Paper from '@material-ui/core/Paper';

import { DatePicker } from '../../index';

const dialogStyle = {
  display: 'flex',
  flex: 1,
  justifyContent: 'space-evenly',
  paddingTop: '1%',
  paddingBottom: '1%'
};

const DialogActions = ({ actions: { updateDay }, state: { today } }) => (
  <Paper>
    <div style={dialogStyle}>
      <DatePicker
        label="Date"
        onUpdate={updateDay}
        defaultValue={today.toISOString()}
      />
    </div>
  </Paper>
);

export default DialogActions;
