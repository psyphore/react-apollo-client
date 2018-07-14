import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  LandingView,
  BuildingView,
  BuildingDetailView,
  PeepsView,
  DetailView
} from './index';

export default () => (
  <Switch>
    <Route exact path="/" component={LandingView} />

    <Route exact path="/buildings/:first/:offset" component={BuildingView} />
    <Route exact path="/building/:id" component={BuildingDetailView} />

    <Route exact path="/people/:first/:offset" component={PeepsView} />
    <Route exact path="/person/:id" component={DetailView} />

    <Route exact path="/me/:id" component={DetailView} />
  </Switch>
);
