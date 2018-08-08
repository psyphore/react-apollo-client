import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { LandingView, DetailView, ProfileView } from '../views';
import { Callback } from '../components/';
import withAuthorization from '../HOC/withAuth';

export default () => (
  <Switch>
    <Route exact path="/" component={withAuthorization(LandingView)} />
    <Route exact path="/person/:id" component={withAuthorization(DetailView)} />
    <Route exact path="/me" component={withAuthorization(ProfileView)} />
    <Route exact path="/callback" component={Callback} />
  </Switch>
);
