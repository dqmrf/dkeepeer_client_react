import { combineReducers } from 'redux';
import auth from './auth';
import tasks from './tasks';
import router from './router';

export default combineReducers({
  auth,
  tasks,
  router
});
