import React, { Fragment } from 'react';
import { Subscription } from 'react-apollo';
import Typography from '@material-ui/core/Typography';

import { lunchNotification } from '../../graphql/subscriptions/lunch';
import { SharedSnackbarConsumer } from '../alert/SnackBarProvider';

const Message = ({ loading, data }) => (
  <Fragment>
    {!loading &&
      data && (
        <SharedSnackbarConsumer>
          {({ openSnackbar }) => (
            <Fragment>
              {/* <Typography variant="h6" component="h4">
                {data.subject}
              </Typography> */}
              {data.message && openSnackbar(data.message)}
            </Fragment>
          )}
        </SharedSnackbarConsumer>
      )}
  </Fragment>
);

const StandBy = loading => (
  <Fragment>
    {loading && <Typography variant="h5">stand by...</Typography>}
  </Fragment>
);

const NoData = ({ loading, data }) => (
  <Fragment>
    {!loading && !data && <Typography variant="h5">No alerts</Typography>}
  </Fragment>
);

export const DontReadTheComments = ({ repoFullName }) => (
  <Subscription subscription={lunchNotification} variables={{ repoFullName }}>
    {({ data, loading }) => (
      <Fragment>
        <StandBy loading={loading} />
        <Message loading={loading} data={data} />
        <NoData loading={loading} data={data} />
      </Fragment>
    )}
  </Subscription>
);
