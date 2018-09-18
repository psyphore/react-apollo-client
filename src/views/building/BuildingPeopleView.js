import React, { Fragment } from 'react';
import { graphql } from 'react-apollo';

import { getBuildingQuery } from '../../graphql';
import BuildingPersonContainer from '../../components/buildings/BuildingPeopleContainer';
import { Loader, ErrorMessage } from '../../components';

const options = {
  options: ({ match }) => ({
    variables: {
      name: match.params.name
    }
  })
};

const BuildingPeopleView = ({ data: { error, loading, building } }) => (
  <Fragment>
    {loading && <Loader />}
    {error && <ErrorMessage error={error} />}
    {!loading && !error && <BuildingPersonContainer building={building} />}
  </Fragment>
);

export default graphql(getBuildingQuery, options)(BuildingPeopleView);
