import React, { PureComponent, Fragment } from 'react';

import LunchButton from './LunchManagerButton';
import LunchDialog from './LunchManagerDialog';
import { SharedSnackbarConsumer } from '../../alert/SnackBarProvider';

import { SharedLunchManagerConsumer } from '../../../HOC';
import ErrorBoundary from '../../error';

class LunchManagerContainer extends PureComponent {
  static contextType = SharedLunchManagerConsumer;

  render() {
    const {
      actions: { open },
      state: { snackAlert, snackMessage }
    } = this.context;

    console.log(this.context);

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

export default LunchManagerContainer;
