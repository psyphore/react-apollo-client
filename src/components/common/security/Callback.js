import React, { Component } from 'react';
import { Loader } from '../index';
import { Auth } from '../../../services';

const auth = new Auth();

class Callback extends Component {
  handleVerification = (location) => {
    if (/access_token|id_token|error/.test(location.hash)) {
      auth.handleAuthentication();
    }
  };
  componentDidMount() {
    const { location } = this.props
    this.handleVerification(location);
  }

  render() {
    return <Loader />;
  }
}

export default Callback;
