import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { getPeopleQuery } from '../../graphql/index';
import PeopleContainer from '../../components/people/PeopleContainer';
import { Loader } from '../../components/common';

const queryOptions = {
  options: props => ({
    variables: {
      first: parseInt(props.match.params.first),
      offset: parseInt(props.match.params.offset)
    }
  })
};

class PeepsView extends Component {
  render() {
    let { data } = this.props;
    if (data.loading) {
      return (
        <div>
          <Loader />
        </div>
      );
    }

    if (data.error) {
      return <div>{JSON.stringify(data.error)}</div>;
    }

    return (
      <div>
        <PeopleContainer people={data.people} />
      </div>
    );
  }
}

PeepsView = graphql(getPeopleQuery, queryOptions)(PeepsView);
export default PeepsView;
