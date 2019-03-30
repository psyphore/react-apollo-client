import React, { Component } from 'react';

import { Provider as AppProvider } from './appContext';
import { Provider as PersonProvider } from './personContext';
import { Provider as LunchProvider } from './lunchContext';
import { Provider as NotificationProvider } from './notificationContext';

import { SharedSnackbarProvider } from '../components/alert/SnackBarProvider';

class GlobalState extends Component {
  render() {
    const { children } = this.props;
    return (
      <AppProvider>
        <SharedSnackbarProvider>
          <PersonProvider>
            <NotificationProvider>
              <LunchProvider>{children}</LunchProvider>
            </NotificationProvider>
          </PersonProvider>
        </SharedSnackbarProvider>
      </AppProvider>
    );
  }
}
export default GlobalState;
