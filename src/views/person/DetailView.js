import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import { getPersonQuery } from '../../graphql/index';
import { Loader } from '../../components/common';
import PersonDetailedContainer from '../../components/people/PersonDetailedContainer';

const queryOptions = {
  options: props => ({
    variables: {
      id: props.match.params.id
    }
  })
};

class DetailView extends Component {
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
        <PersonDetailedContainer person={data.person} />
      </div>
    );
  }
}

DetailView.PropTypes = {
  classes: PropTypes.object,
  data: PropTypes.object.isRequired
};

DetailView = graphql(getPersonQuery, queryOptions)(DetailView);
export default DetailView;
