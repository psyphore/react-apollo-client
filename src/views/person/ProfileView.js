import React, { Fragment } from 'react';
import { object } from 'prop-types';
import { Query } from 'react-apollo';

import { getMeQuery } from '../../graphql';
import { Loader, ErrorBoundary } from '../../components';
import ProfileContainer from '../../components/people/ProfileContainer';

const ProfileView = ({ auth }) => (
  <Query query={getMeQuery}>
    {({ loading, error, data: { me }, refetch }) => (
      <ErrorBoundary>
        <Fragment>
          {loading ? <Loader /> : null}
          {!loading && !error && (
            <ProfileContainer person={me} refetch={refetch} />
          )}
        </Fragment>
      </ErrorBoundary>
    )}
  </Query>
);

ProfileView.propTypes = {
  classes: object
};

export default ProfileView;
