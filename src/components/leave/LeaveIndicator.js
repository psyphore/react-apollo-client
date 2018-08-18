import React, { Fragment } from 'react';
import { Query } from 'react-apollo';

import { leaveNotification } from '../../graphql';

export default id => {
  return (
    <Query query={leaveNotification} variables={{ personId: id }}>
      {({ data, loading }) =>
        !loading ? <Fragment>{JSON.stringify(data)}</Fragment> : '...'
      }
    </Query>
  );
};
