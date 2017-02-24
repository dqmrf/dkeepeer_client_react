import React       from 'react';
import { Route }   from 'react-router';
import App         from './App';
import SignupRoute from './SignupRoute';
// import LoginRoute  from './LoginRoute';
import fillStore   from '../utils/fillStore';
import NotFound    from '../components/NotFound';

const routes = (
  <Route component={App}>
    <Route path="/signup" component={SignupRoute} />
    <Route path="/" component={SignupRoute} />
    <Route path="*" component={NotFound} />
  </Route>
);

// const routes = (
//   <Route component={App}>
//     <Route path="/signup" component={SignupRoute} />
//     <Route path="/login" component={LoginRoute} />
//     <Route path="/" component={SignupRoute} />

//     <Route requireAuth>
//       <Route path="/dashboard" component={DashboardRoute} />
//     </Route>

//     <Route path="*" component={NotFound} />
//   </Route>
// );

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
        transition.to(...redirectBackAfter('/login', nextState.location));
      } else if (client) {
        fillStore(store, nextState, [route.component]);
      }
    };
  });
};
