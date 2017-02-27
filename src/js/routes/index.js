import React            from 'react';
import { 
  Route, 
  IndexRoute, 
  Redirect, 
  IndexRedirect }        from 'react-router';
import App               from './App';
import SignupRoute       from './SignupRoute';
import LoginRoute        from './LoginRoute';
import DashboardRoute    from './DashboardRoute';
import fillStore         from '../utils/fillStore';
import redirectBackAfter from '../utils/redirectBackAfter';
import NotFound          from '../components/NotFound';

const routes = (
  <Route path="/" component={App}>
    <IndexRedirect to="admin" component={DashboardRoute} />

    <Route path="signup" component={SignupRoute} />
    <Route path="login" component={LoginRoute} />
    
    <Route path="admin" requireAuth>
      <IndexRoute component={DashboardRoute} />
      <Route path="dashboard" component={DashboardRoute} />
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
      const loggedIn = !!store.getState().auth.token;

      if (route.requireAuth && !loggedIn) {
        transition(...redirectBackAfter('/login', nextState.location));
      } else if (client) {
        fillStore(store, nextState, [route.component]);
      }
    };
  });
};
