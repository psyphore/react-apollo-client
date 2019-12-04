import React, { PureComponent, Fragment } from 'react';

import LunchButton from './LunchButton';
import LunchDialog from './LunchDialog';
import { SharedSnackbarConsumer } from '../../alert/SnackBarProvider';

import { LunchContext } from '../../../HOC';
import ErrorBoundary from '../../error';

class LunchContainer extends PureComponent {
  static contextType = LunchContext;

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
