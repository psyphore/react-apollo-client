import React, { PureComponent } from 'react';
import { graphql } from 'react-apollo';

import { getBuildingQuery } from '../../graphql/index'
import BuildingContainerComponent from '../../components/buildings/BuildingContainer';
import { Loader } from '../../components/common';

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
      return <div><Loader /></div>
    }

    if (data.error) {
      return <p>{JSON.stringify(data.error)}</p>
    }

    return (
      <div>
        <BuildingContainerComponent buildings={[data.building]} />
      </div>
    )
  }
}

BuildingView = graphql(getBuildingQuery, options)(BuildingView)
export default BuildingView;
