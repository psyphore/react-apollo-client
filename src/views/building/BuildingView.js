import React, { Fragment } from 'react';
import { graphql } from 'react-apollo';

import { getBuildingsQuery } from '../../graphql';
import BuildingContainerComponent from '../../components/buildings/BuildingContainer';
import { Loader, ErrorMessage } from '../../components';

const options = {
  options: ({ match }) => ({
    variables: {
      first: match.params.first,
      offset: match.params.offset
    }
  })
};

const BuildingView = ({ data }) => (
  <Fragment>
    {data && data.loading ? <Loader /> : null}
    {data && data.error ? <ErrorMessage error={data.error} /> : null}
    {data && !data.loading && !data.error ? (
      <BuildingContainerComponent buildings={data.buildings} />
    ) : null}
  </Fragment>
);

export default graphql(getBuildingsQuery, options)(BuildingView);
