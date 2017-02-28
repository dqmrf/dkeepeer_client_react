import axios             from 'axios';
import Actions           from '../constants/actions';
import cookie            from '../utils/cookie';
import getHeaders        from '../utils/getHeaders.js';
import prepareJson       from '../utils/prepareJson';
import redirectBackAfter from '../utils/redirectBackAfter';

const baseUrl = 'http://localhost:3001';
// const headers = {'Content-Type': 'application/json'} 

export function fetchTasks() {
  return async (dispatch, getState) => {
    try {
      const { auth: { token } } = getState();

      if (!token) { return; }

      const headers = getHeaders(token);
      const res = (await axios.get(`${baseUrl}/api/tasks`, { headers })).data;

      console.log(res);
      // dispatch({ type: FETCH_PROFILE_SUCCESS, user });
    } catch (error) {
      dispatch({ type: FETCH_PROFILE_FAILURE, error });
    }
  };
}

export function saveTask() {
  
}
