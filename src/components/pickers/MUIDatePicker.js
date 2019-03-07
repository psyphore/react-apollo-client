import React from 'react';
import { string, func } from 'prop-types';
import DateFnsUtils from '@date-io/date-fns';
import MuiPickersUtilsProvider from 'material-ui-pickers/MuiPickersUtilsProvider';
import { InlineDatePicker } from 'material-ui-pickers/DatePicker';
import {
  ChevronLeftSharp,
  ChevronRightSharp,
  CalendarTodaySharp
} from '@material-ui/icons';
import DayJS from 'dayjs';

const MUIDatePicker = ({ defaultValue, label, onUpdate }) => (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <InlineDatePicker
      adornmentPosition="start"
      disablePast={true}
      disableFuture={false}
      maxDate={DayJS()
        .add(2, 'week')
        .toISOString()}
      format="dd MMMM YYYY"
      keyboard={false}
      keyboardIcon={<CalendarTodaySharp />}
      rightArrowIcon={<ChevronRightSharp />}
      leftArrowIcon={<ChevronLeftSharp />}
      disableOpenOnEnter
      animateYearScrolling={false}
      label={label}
      value={defaultValue}
      onChange={e => onUpdate(e)}
    />
  </MuiPickersUtilsProvider>
);

MUIDatePicker.propTypes = {
  label: string,
  defaultValue: string,
  onUpdate: func
};

export default MUIDatePicker;
