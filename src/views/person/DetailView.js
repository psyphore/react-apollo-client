import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import { getPersonQuery } from '../../graphql/index';
import { Loader, ErrorMessage } from '../../components';
import PersonDetailedContainer from '../../components/people/PersonDetailedContainer';

const queryOptions = {
  options: props => ({
    variables: {
      id: props.match.params.id
    }
  })
};

function DetailView(props) {
  const { data, auth } = props;
  return (
    <div>
      {data && data.loading ? <Loader /> : null}
      {data && data.error ? <ErrorMessage error={data.error} /> : null}
      {data && !data.loading && !data.error ? (
        <PersonDetailedContainer auth={auth} person={data.person} />
      ) : null}
    </div>
  );
}

DetailView.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object.isRequired
};

export default graphql(getPersonQuery, queryOptions)(DetailView);
