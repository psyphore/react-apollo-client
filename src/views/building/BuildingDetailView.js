import React, { PureComponent } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import BuildingContainerComponent from '../../components/buildings/BuildingContainer';

const query = gql`
query getBuildings($id: ID, $name: String) {
  building(id: $id, name: $name) {
    ...buildingFields
  }
}

fragment buildingFields on Building {
  id
  name
  address
  headcount
  people {
    ...personFields
  }
}

fragment personFields on Person {
  id
  firstname
  lastname
}

 ` 

const options = {
  options: props => ({
    variables: {
        id: props.match.params.id
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
        <BuildingContainerComponent building={data.building} />
      </div>
    )
  }
}

BuildingView = graphql(query, options)(BuildingView)
export default BuildingView;
