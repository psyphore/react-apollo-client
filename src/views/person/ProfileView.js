import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import { getMeQuery } from '../../graphql/index';
import { Loader, ErrorMessage } from '../../components/common';
import ProfileContainer from '../../components/people/ProfileContainer';

class ProfileView extends Component {
  render() {
    let { data, auth } = this.props;

    if (data.loading) {
      return <Loader />;
    }

    if (data.error) {
      return <ErrorMessage error={data.error} />;
    }

    return <ProfileContainer auth={auth} person={data.me} />;
  }
}

ProfileView.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object.isRequired
};

export default graphql(getMeQuery, {})(ProfileView);
