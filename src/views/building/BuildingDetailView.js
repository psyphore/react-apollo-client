import React from 'react';
import { graphql } from 'react-apollo';

import { getBuildingQuery } from '../../graphql';
import BuildingContainerComponent from '../../components/buildings/BuildingContainer';
import { Loader, ErrorMessage } from '../../components';

const options = {
  options: props => ({
    variables: {
      id: props.match.params.id
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
        <BuildingContainerComponent buildings={[data.building]} />
      ) : null}
    </div>
  );
}

export default graphql(getBuildingQuery, options)(BuildingView);
