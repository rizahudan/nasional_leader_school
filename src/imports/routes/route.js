import React from 'react';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';
import Home from '../ui/Home';

const browserHistory = createBrowserHistory();

const renderRoutes = () => (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/home" component={Home} />
    </Switch>
  </Router>
);

export default renderRoutes;
