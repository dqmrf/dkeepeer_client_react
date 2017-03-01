import axios             from 'axios';
import Actions           from '../constants/actions';
import cookie            from '../utils/cookie';
import getHeaders        from '../utils/getHeaders.js';
import prepareJson       from '../utils/prepareJson';
import redirectBackAfter from '../utils/redirectBackAfter';

const {
  FETCH_TASKS,
  FETCH_TASKS_FULFILLED,
  FETCH_TASKS_REJECTED
} = Actions;

const baseUrl = 'http://localhost:3001';
// const headers = {'Content-Type': 'application/json'} 

export function fetchTasks() {
  return async (dispatch, getState) => {
    try {
      const { auth: { token } } = getState();

      if (!token) { return; }

      const headers = getHeaders(token);
      const res = (await axios.get(`${baseUrl}/api/tasks`, { headers })).data;
      
      dispatch({type: FETCH_TASKS_FULFILLED, payload: res.tasks})
    } catch (error) {
      dispatch({ type: FETCH_TASKS_REJECTED, error });
    }
  };
}
