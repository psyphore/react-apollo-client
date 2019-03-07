import React from 'react';
import Paper from '@material-ui/core/Paper';

import { DatePicker, SimpleLookUp } from '../index';

const dialogStyle = {
  display: 'flex',
  flex: 1,
  justifyContent: 'space-evenly',
  paddingTop: '1%',
  paddingBottom: '1%'
};

const DialogActions = ({
  actions: { updateDay, selectOnBehalfOf },
  state: { today }
}) => (
  <Paper>
    <div style={dialogStyle}>
      <DatePicker
        label="Date"
        onUpdate={updateDay}
        defaultValue={today.toISOString()}
      />
      <SimpleLookUp onSelection={selectOnBehalfOf} />
    </div>
  </Paper>
);

export default DialogActions;
