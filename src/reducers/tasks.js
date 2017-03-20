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
  fetching: {
    tasks: false,
    task: false,
    create: false,
    update: false,
    destroy: false
  },
  fetched: {
    tasks: false,
    task: false,
    create: false,
    update: false,
    destroy: false
  },
  error: null
}, action) {

  switch (action.type) {
    case FETCHING_TASK: {
      const field = action.payload;

      return {
        ...state,
        fetching: {
          ...state.fetching,
          [field]: true
        },
        fetched: {
          ...state.fetched,
          [field]: false
        },
        error: null,
      };
    }

    case FETCH_TASKS_FULFILLED: {
      return {
        ...state,
        tasks: action.payload,
        fetching: {
          ...state.fetching,
          tasks: false
        },
        fetched: {
          ...state.fetched,
          tasks: true
        },
        error: null
      };
    }

    case FETCH_TASK_FULFILLED: {
      return {
        ...state,
        task: action.payload,
        fetching: {
          ...state.fetching,
          task: false
        },
        fetched: {
          ...state.fetched,
          task: true
        },
        error: null
      };
    }

    case CREATE_TASK_FULFILLED: {
      return {
        ...state,
        tasks: [ action.payload, ...state.tasks ],
        fetching: {
          ...state.fetching,
          create: false
        },
        fetched: {
          ...state.fetched,
          create: true
        },
        error: null
      };
    }

    case UPDATE_TASK_FULFILLED: {
      const { id } = action.payload;
      const newTasks = [ ...state.tasks ];
      const tasksToUpdate = newTasks.findIndex(t => t.id === id);
      
      newTasks[tasksToUpdate] = action.payload;

      return {
        ...state,
        tasks: newTasks,
        fetching: {
          ...state.fetching,
          update: false
        },
        fetched: {
          ...state.fetched,
          update: true
        },
        error: null
      };
    }

    case DESTROY_TASK_FULFILLED: {
      return {
        ...state,
        tasks: state.tasks.filter(t => t.id !== action.payload),
        fetching: {
          ...state.fetching,
          destroy: false
        },
        fetched: {
          ...state.fetched,
          destroy: true
        },
        error: null
      };
    }

    case DESTROY_TASKS_FULFILLED: {
      return {
        ...state,
        tasks: state.tasks.filter(t => !action.payload.includes(t.id+'')),
        fetching: {
          ...state.fetching,
          destroy: false
        },
        fetched: {
          ...state.fetched,
          destroy: true
        },
        error: null
      };
    }

    case FETCH_TASK_REJECTED:
    case FETCH_TASKS_REJECTED:
    case CREATE_TASK_REJECTED:
    case UPDATE_TASK_REJECTED:
    case DESTROY_TASK_REJECTED:
    case DESTROY_TASKS_REJECTED: {
      const { field, error } = action.payload;

      return {
        ...state,
        fetching: {
          ...state.fetching,
          [field]: false
        },
        fetched: {
          ...state.fetched,
          [field]: true
        },
        error,
      };
    }

    default: {
      return state;
    }
  }
}
