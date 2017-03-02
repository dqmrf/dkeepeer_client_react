import keyMirror from 'key-mirror';

export default keyMirror({
  ROUTER_STATE_CHANGE: null,

  SIGNUP: null,
  SIGNUP_SUCCESS: null,
  SIGNUP_FAILURE: null,

  LOGIN: null,
  LOGIN_SUCCESS: null,
  LOGIN_FAILURE: null,

  LOGOUT: null,

  FETCH_TASKS: null,
  FETCH_TASKS_FULFILLED: null,
  FETCH_TASKS_REJECTED: null,

  FETCH_TASK_FULFILLED: null,
  FETCH_TASK_REJECTED: null,

  UPDATE_TASK_FULFILLED: null,
  UPDATE_TASK_REJECTED: null,
});
