import React            from 'react';
import { 
  Route, 
  IndexRoute, 
  Redirect, 
  IndexRedirect }        from 'react-router';
import App               from './App';
import RequireAuth       from './RequireAuth';
import AdminGuard        from './guards/AdminGuard';
import GuestGuard        from './guards/GuestGuard';
import SignupRoute       from './components/SignupRoute';
import LoginRoute        from './components/LoginRoute';
import DashboardRoute    from './components/DashboardRoute';
import fillStore         from '../utils/fillStore';
import redirectBackAfter from '../utils/redirectBackAfter';
import NotFound          from '../components/NotFound';

const routes = (
  <Route path="/" component={App}>
    <IndexRedirect to="admin" />

    <Route component={RequireAuth(GuestGuard, false)} >
      <Route path="signup" component={SignupRoute} />
      <Route path="login" component={LoginRoute} />
    </Route>

    <Route path="admin" component={RequireAuth(AdminGuard)} >
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
