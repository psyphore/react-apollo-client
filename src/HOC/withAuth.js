import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { Auth } from '../services';

export default ProtectedComponent => {
  class AuthHOC extends Component {
    constructor(props, context) {
      super(props, context);
      this.auth = new Auth();
    }

    handleAuthentication() {
      if (!this.auth.isAuthenticated()) {
        this.auth.login();
      }
    }

    componentDidMount() {
      this.handleAuthentication();
    }

    render() {
      // Pass the received 'props' and created functions to the ProtectedRoute component
      return <ProtectedComponent {...this.props} />;
    }
  }

  AuthHOC.contextTypes = {
    router: PropTypes.object.isRequired
  };

  return withRouter(AuthHOC);
};
