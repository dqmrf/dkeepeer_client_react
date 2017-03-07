import Actions from '../constants/actions';

const {
  FETCH_TASKS,
  FETCH_TASKS_FULFILLED,
  FETCH_TASKS_REJECTED,

  FETCH_TASK_FULFILLED,
  FETCH_TASK_REJECTED,

  CREATE_TASK_FULFILLED,
  CREATE_TASK_REJECTED,

  UPDATE_TASK_FULFILLED,
  UPDATE_TASK_REJECTED,

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
        tasks: [action.payload, ...state.tasks],
      }
    }

    case UPDATE_TASK_FULFILLED: {
      const { id } = action.payload;
      const newTasks = [...state.tasks];
      const tasksToUpdate = newTasks.findIndex(t => t.id === id);
      newTasks[tasksToUpdate] = action.payload;

      return {
        ...state,
        tasks: newTasks,
      }
    }

    case DESTROY_TASK_FULFILLED: {
      return {
        ...state,
        tasks: state.tasks.filter(t => t.id !== action.payload),
      }
    }

    case FETCH_TASK_REJECTED:
    case FETCH_TASKS_REJECTED:
    case CREATE_TASK_REJECTED:
    case UPDATE_TASK_REJECTED:
    case DESTROY_TASK_REJECTED: {
      console.error(action.payload);
      return {...state, fetching: false, error: action.payload}
    }

    default: {
      return state;
    }
  }
}
