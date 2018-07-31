import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import { getMeQuery } from '../../graphql';
import { Loader, ErrorMessage } from '../../components';
import ProfileContainer from '../../components/people/ProfileContainer';

function ProfileView(props) {
  let { data, auth } = props;
  return (
    <div>
      {data && data.loading ? <Loader /> : null}
      {data && data.error ? <ErrorMessage error={data.error} /> : null}
      {data && !data.loading && !data.error ? (
        <ProfileContainer auth={auth} person={data.me} />
      ) : null}
    </div>
  );
}

ProfileView.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object.isRequired
};

export default graphql(getMeQuery, {})(ProfileView);
