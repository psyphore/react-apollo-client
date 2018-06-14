import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import RegionContainer from '../components/region/RegionContainer';

const query = gql`
query letha($id: ID, $title: String, $first: Int, $offset: Int) {
  regions(id: $id, title: $title, first: $first, offset: $offset) {
    ...basicRegionFields
    people {
      ...basicPersonFields
    }
  }
}

fragment basicPersonFields on Person {
  id
}

fragment basicRegionFields on Region {
  id
  title
  address
}
 ` 

const options = {
  options: props => ({
    variables: {
        offset: props.match.params.offset,
        first: props.match.params.first
    }
  })
}

class RegionView extends Component {
  
  render() {
    let { data } = this.props
    if (data.loading) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <RegionContainer regions={data.regions} />
      </div>
    )
  }
}

RegionView = graphql(query, options)(RegionView)
export default RegionView;
