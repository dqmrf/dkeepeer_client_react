import axios             from 'axios';
import { addAlertAsync } from './alerts';
import Actions           from '../constants/actions';
import cookie            from '../utils/cookie';
import getHeaders        from '../utils/getHeaders.js';
import prepareJson       from '../utils/prepareJson';
import redirectBackAfter from '../utils/redirectBackAfter';

const {
  FETCHING_TASK,

  FETCH_TASKS_FULFILLED,
  FETCH_TASKS_REJECTED,

  FETCH_TASK_FULFILLED,
  FETCH_TASK_REJECTED,

  CREATE_TASK_FULFILLED,
  CREATE_TASK_REJECTED,

  UPDATE_TASK_FULFILLED,
  UPDATE_TASK_REJECTED,

  DESTROY_TASK_FULFILLED,
  DESTROY_TASK_REJECTED,

  DESTROY_TASKS_FULFILLED,
  DESTROY_TASKS_REJECTED
} = Actions;

const baseUrl = 'http://localhost:3001';

export function fetchTasks() {
  return async (dispatch, getState) => {
    dispatch({ type: FETCHING_TASK });

    try {
      const { auth: { token } } = getState();

      if (!token) { return; }

      const headers = getHeaders(token);
      const res = await axios.get(`${baseUrl}/api/tasks`, { headers });
      let tasks = []

      if (res.status == 200) {
        tasks = res.data.tasks;
      }

      dispatch({type: FETCH_TASKS_FULFILLED, payload: tasks})
    } catch (error) {
      dispatch({ type: FETCH_TASKS_REJECTED, payload: error });
    }
  };
}

export function fetchTask(id) {
  return async (dispatch, getState) => {
    dispatch({ type: FETCHING_TASK });

    try {
      const { auth: { token } } = getState();

      if (!token) { return; }

      const headers = getHeaders(token);
      const res = await axios.get(`${baseUrl}/api/tasks/${id}`, { headers });

      if (res.status == 200) {
        const { data } = res;
        dispatch({type: FETCH_TASK_FULFILLED, payload: data})
      }
      
    } catch (error) {
      dispatch({ type: FETCH_TASK_REJECTED, payload: error });
    }
  };
}

export function createTask(task) {
  return async (dispatch, getState) => {
    dispatch({ type: FETCHING_TASK });

    try {
      const { auth: { token } } = getState();

      if (!token) { return; }

      const body = prepareJson({task: task});
      let headers = getHeaders(token);

      headers['Content-Type'] = 'application/json';

      const res = await axios.post(`${baseUrl}/api/tasks`, body, { headers: headers });

      if (res.status == 200) {
        const { data } = res;
        dispatch({type: CREATE_TASK_FULFILLED, payload: data})

        addAlertAsync({
          message: 'Task has been created'
        })(dispatch);
      }
    } catch (error) {
      dispatch({ type: CREATE_TASK_REJECTED, payload: error });
    }
  }
}

export function updateTask(id, task) {
  return async (dispatch, getState) => {
    dispatch({ type: FETCHING_TASK });

    try {
      const { auth: { token } } = getState();

      if (!token) { return; }

      let body = prepareJson({task: task});
      let headers = getHeaders(token);

      headers['Content-Type'] = 'application/json';

      const res = await axios.put(`${baseUrl}/api/tasks/${id}`, body, { headers: headers });

      if (res.status == 200) {
        dispatch({ type: UPDATE_TASK_FULFILLED, payload: task });
        return true;
      }
    } catch (error) {
      dispatch({ type: UPDATE_TASK_REJECTED, payload: error });
      return false;
    }
  }
}

export function destroyTask(id) {
  return async (dispatch, getState) => {
    dispatch({ type: FETCHING_TASK });
    
    try {
      const { auth: { token } } = getState();

      if (!token) { return; }

      let headers = getHeaders(token);

      headers['Content-Type'] = 'application/json';

      const res = await axios.delete(`${baseUrl}/api/tasks/${id}`, { headers: headers });

      if (res.status == 200) {
        const { id } = res.data;
        dispatch({type: DESTROY_TASK_FULFILLED, payload: id})

        addAlertAsync({
          message: 'Task has been destroyed'
        })(dispatch);
      }
    } catch (error) {
      dispatch({ type: DESTROY_TASK_REJECTED, payload: error });
    }
  }
}

export function destroyTasks(ids) {
  return async (dispatch, getState) => {
    dispatch({ type: FETCHING_TASK });

    try {
      const { auth: { token } } = getState();

      if (!token) { return; }

      let body = { tasks: ids }
      let headers = getHeaders(token);

      headers['Content-Type'] = 'application/json';

      const res = await axios.delete(`${baseUrl}/api/tasks/batch_destroy`, 
        { 
          params: body,
          headers: headers 
        }
      );

      if (res.status == 200) {
        const { ids } = res.data;
        const { length } = ids;

        dispatch({type: DESTROY_TASKS_FULFILLED, payload: ids});

        addAlertAsync({
          message: `${length} task${length > 1 ? 's' : '' } ha${length > 1 ? 've' : 's'} been destroyed`
        })(dispatch);
      }

    } catch (error) {
      dispatch({ type: DESTROY_TASKS_REJECTED, payload: error });
    }
  }
}
