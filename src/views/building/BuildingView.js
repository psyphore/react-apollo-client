import React, { PureComponent } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import BuildingContainerComponent from '../../components/buildings/BuildingContainer';

const query = gql`
query getBuildings($id: ID, $name: String, $first: Int, $offset: Int) {
  buildings(id: $id, name: $name, first: $first, offset: $offset) {
    ...buildingFields
  }
}

fragment buildingFields on Building {
  id
  name
  address
  headcount
}
 ` 

const options = {
  options: props => ({
    variables: {
        offset: parseInt(props.match.params.offset),
        first: parseInt(props.match.params.first)
    }
  })
}

class BuildingView extends PureComponent {
  
  render() {
    let { data } = this.props
    if (data.loading) {
      return <div>Loading...</div>
    }

    if (data.error) {
      return <p>{JSON.stringify(data.error)}</p>
    }

    return (
      <div>
        <BuildingContainerComponent buildings={data.buildings} />
      </div>
    )
  }
}

BuildingView = graphql(query, options)(BuildingView)
export default BuildingView;
