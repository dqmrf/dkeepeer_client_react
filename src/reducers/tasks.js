import Actions from '../constants/actions';

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

export default function reducer(state={
  task: {},
  tasks: [],
  fetching: false,
  fetched: false,
  error: null
}, action) {

  switch (action.type) {
    case FETCHING_TASK: {
      return {
        ...state,
        fetching: true,
        fetched: false
      };
    }

    case FETCH_TASKS_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        tasks: action.payload
      }
    }

    case FETCH_TASK_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        task: action.payload
      }
    }

    case CREATE_TASK_FULFILLED: {
      return {
        ...state,
        tasks: [action.payload, ...state.tasks]
      }
    }

    case UPDATE_TASK_FULFILLED: {
      const { id } = action.payload;
      const newTasks = [...state.tasks];
      const tasksToUpdate = newTasks.findIndex(t => t.id === id);
      newTasks[tasksToUpdate] = action.payload;

      return {
        ...state,
        fetching: false,
        fetched: true,
        tasks: newTasks,
      }
    }

    case DESTROY_TASK_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        tasks: state.tasks.filter(t => t.id !== action.payload),
      }
    }

    case DESTROY_TASKS_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        tasks: state.tasks.filter(t => !action.payload.includes(t.id+'')),
      }
    }

    case FETCH_TASK_REJECTED:
    case FETCH_TASKS_REJECTED:
    case CREATE_TASK_REJECTED:
    case UPDATE_TASK_REJECTED:
    case DESTROY_TASK_REJECTED:
    case DESTROY_TASKS_REJECTED: {
      return {...state, fetching: false, error: action.payload}
    }

    default: {
      return state;
    }
  }
}
