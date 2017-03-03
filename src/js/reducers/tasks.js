import Actions from '../constants/actions';

const {
  FETCH_TASKS,
  FETCH_TASKS_FULFILLED,
  FETCH_TASKS_REJECTED,

  FETCH_TASK_FULFILLED,
  FETCH_TASK_REJECTED,

  CREATE_TASK_FULFILLED,
  CREATE_TASK_REJECTED,

  // this actions don't exist yet.
  UPDATE_TASK_FULFILLED,
  UPDATE_TASK_REJECTED,
  // ...

  DESTROY_TASK_FULFILLED,
  DESTROY_TASK_REJECTED
} = Actions;

export default function reducer(state={
  task: {},
  tasks: [],
  fetching: false,
  fetched: false,
  error: null
}, action) {

  switch (action.type) {
    case FETCH_TASKS: {
      return {...state, fetching: true}
    }

    case FETCH_TASKS_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        tasks: action.payload
      }
    }

    case FETCH_TASKS_REJECTED: {
      return {...state, fetching: false, error: action.payload}
    }

    case FETCH_TASK_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        task: action.payload
      }
    }

    case FETCH_TASK_REJECTED: {
      return {...state, fetching: false, error: action.payload}
    }

    case CREATE_TASK_FULFILLED: {
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      }
    }

    case CREATE_TASK_REJECTED: {
      return {...state, fetching: false, error: action.payload}
    }

    case DESTROY_TASK_FULFILLED: {
      console.log(action.payload);
      return {
        ...state,
        tasks: state.tasks.filter(t => t.id !== action.payload),
      }
    }

    case DESTROY_TASK_REJECTED: {
      return {...state, fetching: false, error: action.payload}
    }

    default: {
      return state;
    }
  }
}
