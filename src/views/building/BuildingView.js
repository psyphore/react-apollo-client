import React, { PureComponent } from 'react';
import { graphql } from 'react-apollo';

import { getBuildingsQuery } from '../../graphql/index'
import BuildingContainerComponent from '../../components/buildings/BuildingContainer';
import { Loader } from '../../components/common';

const options = {
  options: props => ({
    variables: {
      first: props.match.params.first,  
      offset: props.match.params.offset
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
        <BuildingContainerComponent buildings={data.buildings} />
      </div>
    )
  }
}

BuildingView = graphql(getBuildingsQuery, options)(BuildingView)
export default BuildingView;
