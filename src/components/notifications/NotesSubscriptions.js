import React, { Fragment } from 'react';
import { Subscription } from 'react-apollo';
import Typography from '@material-ui/core/Typography';

import { lunchNotification } from '../../graphql/subscriptions/lunch';

const Message = ({ loading, data }) => (
  <Fragment>
    {!loading &&
      data && (
        <Fragment>
          <Typography variant="title" component="h4">
            {data.subject}
          </Typography>
          {/* <pre>{JSON.parse(data.body)}</pre> */}
        </Fragment>
      )}
  </Fragment>
);

const StandBy = loading => (
  <Fragment>
    {loading && <Typography variant="headline">stand by...</Typography>}
  </Fragment>
);

const NoData = ({ loading, data }) => (
  <Fragment>
    {!loading && !data && <Typography variant="headline">No alerts</Typography>}
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
