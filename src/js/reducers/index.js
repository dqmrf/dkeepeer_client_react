import { combineReducers } from 'redux';
import auth from './auth';
import router from './router';

export default combineReducers({
  auth,
  router
});
