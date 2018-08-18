import React, { Component } from 'react';
import { object } from 'prop-types';
import { withRouter } from 'react-router-dom';

import { Auth } from '../services';

export default ProtectedComponent => {
  class AuthHOC extends Component {
    constructor(props, context) {
      super(props, context);
      this.auth = new Auth();
    }

    componentDidMount() {
      if (!this.auth.isAuthenticated()) {
        this.auth.login();
      }
    }

    render() {
      // Pass the received 'props' and created functions to the ProtectedRoute component
      return <ProtectedComponent auth={this.auth} {...this.props} />;
    }
  }

  AuthHOC.contextTypes = {
    router: object.isRequired
  };

  return withRouter(AuthHOC);
};
