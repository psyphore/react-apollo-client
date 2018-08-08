import React, { Fragment } from 'react';
import { object } from 'prop-types';
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

const DetailView = ({ data, auth }) => (
  <Fragment>
    {data && data.loading ? <Loader /> : null}
    {data && data.error ? <ErrorMessage error={data.error} /> : null}
    {data && !data.loading && !data.error ? (
      <PersonDetailedContainer auth={auth} person={data.person} />
    ) : null}
  </Fragment>
);

DetailView.propTypes = {
  classes: object,
  data: object.isRequired
};

export default graphql(getPersonQuery, queryOptions)(DetailView);
