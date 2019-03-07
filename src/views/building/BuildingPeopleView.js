import React, { Fragment } from 'react';
import { graphql } from 'react-apollo';

import { getBuildingQuery } from '../../graphql';
import BuildingPersonContainer from '../../components/buildings/BuildingPeopleContainer';
import { Loader, ErrorBoundary } from '../../components';

const options = {
  options: ({ match }) => ({
    variables: {
      name: match.params.name
    }
  })
};

const BuildingPeopleView = ({ data: { error, loading, building } }) => (
  <ErrorBoundary>
    <Fragment>
      {loading && <Loader />}
      {!loading && !error && <BuildingPersonContainer building={building} />}
    </Fragment>
  </ErrorBoundary>
);

export default graphql(getBuildingQuery, options)(BuildingPeopleView);
