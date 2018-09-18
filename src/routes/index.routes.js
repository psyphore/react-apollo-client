import React from 'react';
import Loadable from 'react-loadable';
import { Route, Switch } from 'react-router-dom';

import withAuthorization from '../HOC/withAuth';
import Loader from '../components/loader/NavLoader';

const Home = Loadable({
  loader: () => import('../views/LandingView'),
  loading: Loader
});
const PersonDetail = Loadable({
  loader: () => import('../views/person/DetailView'),
  loading: Loader
});
const BuildingPeopleView = Loadable({
  loader: () => import('../views/building/BuildingPeopleView'),
  loading: Loader
});
const ProductPeopleView = Loadable({
  loader: () => import('../views/product/ProductPeopleView'),
  loading: Loader
});
const MyProfile = Loadable({
  loader: () => import('../views/person/ProfileView'),
  loading: Loader
});
const SecurityCallback = Loadable({
  loader: () => import('../components/security/Callback'),
  loading: Loader
});

export default () => (
  <Switch>
    <Route exact path="/" component={withAuthorization(Home)} />
    <Route
      exact
      path="/person/:id"
      component={withAuthorization(PersonDetail)}
    />
    <Route
      exact
      path="/building/:name"
      component={withAuthorization(BuildingPeopleView)}
    />
    <Route
      exact
      path="/product/:name"
      component={withAuthorization(ProductPeopleView)}
    />
    <Route exact path="/me" component={withAuthorization(MyProfile)} />
    <Route exact path="/callback" component={SecurityCallback} />
  </Switch>
);
