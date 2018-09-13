import React from 'react';
import { string, func } from 'prop-types';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import { InlineDatePicker } from 'material-ui-pickers/DatePicker';
import {
  ChevronLeftSharp,
  ChevronRightSharp,
  CalendarTodaySharp
} from '@material-ui/icons';
import Moment from 'moment';

const MUIDatePicker = ({ defaultValue, label, onUpdate }) => (
  <MuiPickersUtilsProvider utils={MomentUtils}>
    <InlineDatePicker
      adornmentPosition="start"
      disablePast={true}
      disableFuture={false}
      maxDate={Moment().add('months', 2)}
      format="DD MMM YYYY"
      keyboard
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
