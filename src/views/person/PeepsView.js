import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import PeopleContainer from '../../components/people/people-container';

const query = gql`
query awulethela($first: Int = 5, $offset: Int = 0) {
  people(first: $first, offset: $offset) {
    ...basicFields
  }
}

fragment basicFields on Person {
  id
  firstname
  lastname
  avatar
}
 `

const options = {
  options: props => ({
    variables: {
        first: props.match.params.first,
        offset: props.match.params.offset
    }
  })
}

class PeepsView extends Component {
  
  render() {
    let { data } = this.props
    if (data.loading) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <PeopleContainer people={data.people} />
      </div>
    )
  }
}

PeepsView = graphql(query, options)(PeepsView)
export default PeepsView;
