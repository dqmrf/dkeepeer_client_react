import React                 from 'react';
import { 
  Route,
  IndexRedirect }            from 'react-router';
import App                   from '../components/App';
import RequireAuth           from './RequireAuth';
import AdminScope            from './scopes/AdminScope';
import GuestScope            from './scopes/GuestScope';
import Signup                from '../components/Auth/Signup';
import Login                 from '../components/Auth/Login';
import EmailConfirmation     from '../components/Auth/EmailConfirmation';
import Dashboard             from '../components/Dashboard/Dashboard';
import SingleTask            from '../components/Tasks/SingleTask';
import TaskEditor            from '../components/Tasks/TaskEditor';
import NotFound              from '../components/Errors/NotFound';
import { routerStateChange } from '../actions/router';

const routes = (
  <Route path="/" component={App}>
    <IndexRedirect to="admin" />

    <Route component={RequireAuth(GuestScope, false)}>
      <Route path="signup" component={Signup} stateListener />
      <Route path="login" component={Login} stateListener />
      <Route path="confirm_email" component={EmailConfirmation} stateListener />
    </Route>

    <Route path="admin" component={RequireAuth(AdminScope)}>
      <IndexRedirect to="dashboard" />
      <Route path="dashboard" component={Dashboard} stateListener />
      <Route path="task/:id" component={SingleTask} stateListener />
      <Route path="task/:id/edit" component={TaskEditor} stateListener />
    </Route>

    <Route path='*' component={NotFound} />
  </Route>
);

function walk(routes, cb) {
  cb(routes);

  if (routes.childRoutes) {
    routes.childRoutes.forEach(route => walk(route, cb));
  }

  return routes;
}

export default (store, client) => {
  return walk(Route.createRouteFromReactElement(routes), route => {
    route.onEnter = (nextState, transition) => {
      if (route.stateListener) {
        store.dispatch(routerStateChange(nextState));
      }
    };
  });
};
