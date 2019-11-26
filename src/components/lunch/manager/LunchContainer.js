import React, { PureComponent, Fragment } from 'react';

import LunchButton from './LunchManagerButton';
import LunchDialog from './LunchManagerDialog';
import { SharedSnackbarConsumer } from '../../alert/SnackBarProvider';

import { SharedLunchManagerConumer } from '../../../HOC';
import ErrorBoundary from '../../error';

class LunchContainer extends PureComponent {
  static contextType = SharedLunchManagerConumer;

  render() {
    const {
      actions: { open },
      state: { snackAlert, snackMessage }
    } = this.context;

    return (
      <ErrorBoundary>
        <SharedSnackbarConsumer>
          {({ openSnackbar }) => (
            <Fragment>
              <LunchButton clickHandler={open} />
              <LunchDialog />
              {snackAlert && openSnackbar(snackMessage)}
            </Fragment>
          )}
        </SharedSnackbarConsumer>
      </ErrorBoundary>
    );
  }
}

export default LunchContainer;
