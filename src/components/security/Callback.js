import React, { Component } from 'react';
import { Loader } from '../index';
import { Auth } from '../../services';

const auth = new Auth();

export default class Callback extends Component {
  handleVerification = ({ hash }) => {
    if (/access_token|id_token|error/.test(hash)) {
      auth.handleAuthentication();
    }
  };

  componentDidMount() {
    const { location } = this.props;
    this.handleVerification(location);
  }

  render() {
    return <Loader />;
  }
}
