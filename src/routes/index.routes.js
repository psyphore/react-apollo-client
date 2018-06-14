import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { 
    LandingView, 
    RegionView, 
    PeepsView, 
    DetailView 
} from './index'

export default () => (
    <Switch>
          <Route exact path="/" component={LandingView} />
          
          <Route exact path="/regions/:first/:offset" component={RegionView} />
          <Route exact path="/regions/:id" component={LandingView} />
  
          <Route exact path="/people/:first/:offset" component={PeepsView} />
          <Route exact path="/person/:firstname/:lastname" component={DetailView} />
          <Route exact path="/person/:firstname/:lastname/extra" component={DetailView} />
    </Switch>
  );