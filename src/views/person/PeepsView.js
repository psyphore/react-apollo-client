import React, { Fragment } from 'react';
import { graphql } from 'react-apollo';

import { getPeopleQuery } from '../../graphql';
import PeopleContainer from '../../components/people/PeopleContainer';
import { Loader, ErrorMessage } from '../../components';

const queryOptions = {
  options: props => ({
    variables: {
      first: props.match.params.first,
      offset: props.match.params.offset
    }
  })
};

const PeepsView = ({ data }) => (
  <Fragment>
    {data && data.loading ? <Loader /> : null}
    {data && data.error ? <ErrorMessage error={data.error} /> : null}
    {data && !data.loading && !data.error ? (
      <PeopleContainer people={data.people} />
    ) : null}
  </Fragment>
);

export default graphql(getPeopleQuery, queryOptions)(PeepsView);
