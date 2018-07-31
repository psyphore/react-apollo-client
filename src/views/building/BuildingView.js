import React from 'react';
import { graphql } from 'react-apollo';

import { getBuildingsQuery } from '../../graphql';
import BuildingContainerComponent from '../../components/buildings/BuildingContainer';
import { Loader, ErrorMessage } from '../../components';

const options = {
  options: props => ({
    variables: {
      first: props.match.params.first,
      offset: props.match.params.offset
    }
  })
};

function BuildingView(props) {
  const { data } = props;
  return (
    <div>
      {data && data.loading ? <Loader /> : null}
      {data && data.error ? <ErrorMessage error={data.error} /> : null}
      {data && !data.loading && !data.error ? (
        <BuildingContainerComponent buildings={data.buildings} />
      ) : null}
    </div>
  );
}

export default graphql(getBuildingsQuery, options)(BuildingView);
