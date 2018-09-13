import React, { Fragment } from 'react';
import { Subscription } from 'react-apollo';
import Typography from '@material-ui/core/Typography';

import { lunchNotification } from '../../graphql/subscriptions/lunch';

export const DontReadTheComments = ({ repoFullName }) => (
  <Subscription subscription={lunchNotification} variables={{ repoFullName }}>
    {({ data, loading }) => (
      <Fragment>
        {loading && <Typography variant="headline">stand by...</Typography>}
        {!loading &&
          data && (
            <Typography variant="title" component="h4">
              New Alert
            </Typography>
          )}
        {!loading && data && <pre>{JSON.parse(data.meals)}</pre>}
        {!loading &&
          !data && <Typography variant="headline">No alerts</Typography>}
      </Fragment>
    )}
  </Subscription>
);
