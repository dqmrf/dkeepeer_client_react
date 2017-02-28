import React            from 'react';
import { 
  Route, 
  IndexRoute, 
  Redirect, 
  IndexRedirect }        from 'react-router';
import App               from './App';
import AdminRoute        from './AdminRoute';
import GuestRoute        from './GuestRoute';
import SignupRoute       from './SignupRoute';
import RequireAuth       from './RequireAuth';
import LoginRoute        from './LoginRoute';
import DashboardRoute    from './DashboardRoute';
import fillStore         from '../utils/fillStore';
import redirectBackAfter from '../utils/redirectBackAfter';
import NotFound          from '../components/NotFound';

const routes = (
  <Route path="/" component={App}>
    <IndexRedirect to="admin" />

    <Route component={RequireAuth(GuestRoute, false)} >
      <Route path="signup" component={SignupRoute} />
      <Route path="login" component={LoginRoute} />
    </Route>

    <Route path="admin" component={RequireAuth(AdminRoute)} >
      <IndexRedirect to="dashboard" />
      <Route path="dashboard" component={DashboardRoute} />
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
