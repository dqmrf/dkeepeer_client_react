import { combineReducers } from 'redux';
import auth                from './auth';
import tasks               from './tasks';
import alerts              from './alerts';
import router              from './router';

export default combineReducers({
  auth,
  tasks,
  alerts,
  router
});
