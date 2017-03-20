import axios             from 'axios';
import config            from 'app-config';
import { addAlertAsync } from './alerts';
import Actions           from '../constants/actions';
import cookie            from '../utils/cookie';
import ErrorThrower      from '../utils/errorThrower';
import getHeaders        from '../utils/getHeaders';
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

const baseUrl = config.baseUrl;
const apiEndpoint = `${baseUrl}/api/tasks`;

export function fetchTasks(router) {
  return (dispatch, getState) => {
    const field = 'tasks';

    dispatch({ type: FETCHING_TASK, payload: field });

    const { auth: { token } } = getState();

    if (!token) { return; }

    let tasks = [];
    let headers = getHeaders(token);
    let errHandler = new ErrorThrower(dispatch, { 
      type: FETCH_TASKS_REJECTED, payload: { field }
    });

    axios.get(apiEndpoint, { headers })
      .then(res => {
        if (res.status == 200) {
          tasks = res.data.tasks;
        }

        dispatch({ type: FETCH_TASKS_FULFILLED, payload: tasks })

      }, (err => {
        return errHandler.handleError(err, () => {
          const { status } = err.response;

          if (status == 401) {
            cookie.unset('token');
            router.push(...redirectBackAfter('/login', router.location));
          }
        });
      }))
      .catch(err => errHandler.handleUnknownError(err));
  };
}

export function fetchTask(id) {
  return (dispatch, getState) => {
    const field = 'task';

    dispatch({ type: FETCHING_TASK, payload: field });

    const { auth: { token } } = getState();

    if (!token) { return; }

    const headers = getHeaders(token);
    let errHandler = new ErrorThrower(dispatch, { 
      type: FETCH_TASK_REJECTED, payload: { field }
    });

    axios.get(`${apiEndpoint}/${id}`, { headers })
      .then(res => {
        if (res.status == 200) {
          const { data } = res;

          dispatch({type: FETCH_TASK_FULFILLED, payload: data})
        }
      }, (err => {
        return errHandler.handleError(err);
      }))
      .catch(err => errHandler.handleUnknownError(err));
  };
}

export function createTask(task) {
  return (dispatch, getState) => {
    const field = 'create';

    dispatch({ type: FETCHING_TASK, payload: field });

    const { auth: { token } } = getState();

    if (!token) { return; }

    let body, headers;
    let { due_date } = task;
    let errHandler = new ErrorThrower(dispatch, { 
      type: CREATE_TASK_REJECTED, payload: { field }
    });

    task.due_date = fixDateBeforeStringify(due_date);
    body = prepareJson({task: task});
    headers = getHeaders(token);
    headers['Content-Type'] = 'application/json';

    axios.post(apiEndpoint, body, { headers: headers })
      .then(res => {
        if (res.status == 200) {
          const { data } = res;

          dispatch({type: CREATE_TASK_FULFILLED, payload: data})

          addAlertAsync({
            message: 'Task has been created'
          })(dispatch);
        }
      }, (err => {
        return errHandler.handleError(err);
      }))
      .catch(err => errHandler.handleUnknownError(err));
  }
}

export function updateTask(id, task) {
  return (dispatch, getState) => {
    const field = 'update';

    dispatch({ type: FETCHING_TASK, payload: field });

    const { auth: { token } } = getState();

    if (!token) { return; }

    let body, headers;
    let { due_date } = task;
    let errHandler = new ErrorThrower(dispatch, { 
      type: UPDATE_TASK_REJECTED, payload: { field }
    });

    task.due_date = fixDateBeforeStringify(due_date);
    body = prepareJson({task: task});
    headers = getHeaders(token);
    headers['Content-Type'] = 'application/json';

    axios.put(`${apiEndpoint}/${id}`, body, { headers: headers })
      .then(res => {
        if (res.status == 200) {
          dispatch({ type: UPDATE_TASK_FULFILLED, payload: task });

          addAlertAsync({
            message: 'Task successfully updated'
          })(dispatch);

          return true;
        }
      }, (err => {
        return errHandler.handleError(err);
      }))
      .catch(err => errHandler.handleUnknownError(err));
  }
}

export function destroyTask(id) {
  return (dispatch, getState) => {
    const field = 'destroy';

    dispatch({ type: FETCHING_TASK, payload: field });
    
    const { auth: { token } } = getState();

    if (!token) { return; }

    let headers = getHeaders(token);
    let errHandler = new ErrorThrower(dispatch, { 
      type: DESTROY_TASK_REJECTED, payload: { field }
    });

    headers['Content-Type'] = 'application/json';

    axios.delete(`${apiEndpoint}/${id}`, { headers: headers })
      .then(res => {
        if (res.status == 200) {
          const { id } = res.data;

          dispatch({type: DESTROY_TASK_FULFILLED, payload: id})

          addAlertAsync({
            message: 'Task has been destroyed'
          })(dispatch);
        }
      }, (err => {
        return errHandler.handleError(err);
      }))
      .catch(err => errHandler.handleUnknownError(err));
  }
}

export function destroyTasks(ids) {
  return (dispatch, getState) => {
    const field = 'destroy';

    dispatch({ type: FETCHING_TASK, payload: field });

    const { auth: { token } } = getState();

    if (!token) { return; }

    let body = { tasks: ids }
    let headers = getHeaders(token);
    let errHandler = new ErrorThrower(dispatch, { 
      type: DESTROY_TASKS_REJECTED, payload: { field }
    });
    
    headers['Content-Type'] = 'application/json';

    axios.delete(`${apiEndpoint}/batch_destroy`, 
      { 
        params: body,
        headers: headers 
      }
    ).then(res => {
      if (res.status == 200) {
        const { ids } = res.data;
        const { length } = ids;

        dispatch({type: DESTROY_TASKS_FULFILLED, payload: ids});

        addAlertAsync({
          message: `${length} task${length > 1 ? 's' : '' } ha${length > 1 ? 've' : 's'} been destroyed`
        })(dispatch);
      }
    }, (err => {
      return errHandler.handleError(err);
    }))
    .catch(err => errHandler.handleUnknownError(err));
  }
}

function fixDateBeforeStringify(date) {
  if (typeof date !== 'object') { return date; }
  date.setHours(date.getHours() - date.getTimezoneOffset() / 60);
  return date;
}
