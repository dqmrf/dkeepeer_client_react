import React             from 'react';
import { 
  Route,
  IndexRoute,
  IndexRedirect }        from 'react-router';
import App               from './App';
import RequireAuth       from './RequireAuth';
import AdminScope        from './scopes/AdminScope';
import GuestScope        from './scopes/GuestScope';
import Signup            from '../components/Auth/Signup';
import Login             from '../components/Auth/Login';
import Dashboard         from '../components/Dashboard/Dashboard';
import SingleTask        from '../components/Tasks/SingleTask';
import fillStore         from '../utils/fillStore';
import redirectBackAfter from '../utils/redirectBackAfter';
import NotFound          from '../components/NotFound';

const routes = (
  <Route path="/" component={App}>
    <IndexRedirect to="admin" />

    <Route component={RequireAuth(GuestScope, false)}>
      <Route path="signup" component={Signup} />
      <Route path="login" component={Login} />
    </Route>

    <Route path="admin" component={RequireAuth(AdminScope)}>
      <IndexRedirect to="dashboard" />
      <Route path="dashboard" component={Dashboard} />
      <Route path="task/:id" component={SingleTask} />
    </Route>

    <Route path='*' component={NotFound} />
  </Route>
);

function walk(routes, cb) {
  cb(routes);

  if (routes.childRoutes) {
    routes.childRoutes.forEach(route => {
      walk(route, cb)
    });
  }

  return routes;
}

export default (store, client) => {
  return walk(Route.createRouteFromReactElement(routes), route => {
    route.onEnter = (nextState, transition) => {
      if (client) {
        fillStore(store, nextState, [route.component]);
      }
    };
  });
};
