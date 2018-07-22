import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { LandingView, PeepsView, DetailView } from './index';

import { Callback } from '../components/common/';
import withAuthorization from '../HOC/withAuth';

export default () => {
  return (
    <Switch>
      <Route exact path="/" component={withAuthorization(LandingView)} />
      <Route exact path="/people/:first/:offset" component={PeepsView} />
      <Route exact path="/person/:id" component={withAuthorization(DetailView)} />
      <Route exact path="/me" component={withAuthorization(DetailView)} />
      <Route exact path="/callback" component={Callback} />
    </Switch>
  );
};
