import React, { Fragment } from 'react';
import { graphql } from 'react-apollo';

import { getBuildingQuery } from '../../graphql';
import BuildingContainerComponent from '../../components/buildings/BuildingContainer';
import { Loader, ErrorMessage } from '../../components';

const options = {
  options: ({ match }) => ({
    variables: {
      id: match.params.id
    }
  })
};

const BuildingView = ({ data }) => (
  <Fragment>
    {data && data.loading ? <Loader /> : null}
    {data && data.error ? <ErrorMessage error={data.error} /> : null}
    {data && !data.loading && !data.error ? (
      <BuildingContainerComponent buildings={[data.building]} />
    ) : null}
  </Fragment>
);

export default graphql(getBuildingQuery, options)(BuildingView);
