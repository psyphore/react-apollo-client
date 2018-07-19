import React from 'react';
import { Route, Switch } from 'react-router-dom';

import {
  LandingView,
  BuildingView,
  BuildingDetailView,
  PeepsView,
  DetailView
} from './index';
import { Auth } from '../services/';
import { Callback } from '../components/common/'

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

export default () => {
  return (
    <Switch>
      <Route exact path="/" component={LandingView}/>

      <Route exact path="/buildings/:first/:offset" component={BuildingView} />
      <Route exact path="/building/:id" component={BuildingDetailView} />

      <Route exact path="/people/:first/:offset" component={PeepsView} />
      <Route exact path="/person/:id" component={DetailView} />

      <Route exact path="/me" component={DetailView} />

      <Route
        path="/callback"
        render={props => {
          handleAuthentication(props);
          return <Callback {...props} />;
        }}
      />
    </Switch>
  );
};
