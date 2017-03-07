import React             from 'react';
import { 
  Route,
  IndexRedirect }        from 'react-router';
import App               from './App';
import RequireAuth       from './RequireAuth';
import AdminScope        from './scopes/AdminScope';
import GuestScope        from './scopes/GuestScope';
import Signup            from '../components/Auth/Signup';
import Login             from '../components/Auth/Login';
import EmailConfirmation from '../components/Auth/EmailConfirmation';
import Dashboard         from '../components/Dashboard/Dashboard';
import SingleTask        from '../components/Tasks/SingleTask';
import TaskEditor        from '../components/Tasks/TaskEditor';
import NotFound          from '../components/NotFound';

const routes = (
  <Route path="/" component={App}>
    <IndexRedirect to="admin" />

    <Route component={RequireAuth(GuestScope, false)}>
      <Route path="signup" component={Signup} />
      <Route path="login" component={Login} />
      <Route path="confirm_email" component={EmailConfirmation} />
    </Route>

    <Route path="admin" component={RequireAuth(AdminScope)}>
      <IndexRedirect to="dashboard" />
      <Route path="dashboard" component={Dashboard} />
      <Route path="task/:id" component={SingleTask} />
      <Route path="task/:id/edit" component={TaskEditor} />
    </Route>

    <Route path='*' component={NotFound} />
  </Route>
);

export default () => {
  return Route.createRouteFromReactElement(routes);
};
