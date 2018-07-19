import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { LandingView, PeepsView, DetailView } from './index';

import { Auth } from '../services/';
import { Callback } from '../components/common/';
import withAuthorization from '../HOC/withAuth';

const auth = new Auth();

const handleVerification = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

export default () => {
  return (
    <Switch>
      <Route exact path="/" component={withAuthorization(LandingView)} />
      <Route exact path="/people/:first/:offset" component={PeepsView} />
      <Route exact path="/person/:id" component={withAuthorization(DetailView)} />
      <Route exact path="/me" component={DetailView} />
      <Route
        path="/callback"
        render={props => {
          handleVerification(props);
          return <Callback {...props} />;
        }}
      />
    </Switch>
  );
};
