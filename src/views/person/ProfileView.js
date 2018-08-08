import React, { Fragment } from 'react';
import { object } from 'prop-types';
import { graphql } from 'react-apollo';

import { getMeQuery } from '../../graphql';
import { Loader, ErrorMessage } from '../../components';
import ProfileContainer from '../../components/people/ProfileContainer';

const ProfileView = ({ data, auth }) => (
  <Fragment>
    {data && data.loading ? <Loader /> : null}
    {data && data.error ? <ErrorMessage error={data.error} /> : null}
    {data && !data.loading && !data.error ? (
      <ProfileContainer auth={auth} person={data.me} />
    ) : null}
  </Fragment>
);

ProfileView.propTypes = {
  classes: object,
  data: object.isRequired
};

export default graphql(getMeQuery, {})(ProfileView);
