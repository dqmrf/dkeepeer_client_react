import Actions from '../constants/actions';

const {
  FETCH_TASKS_SUCCESS,
  FETCH_TASK_SUCCESS,
  SAVE_TASK_SUCCESS
} = Actions;

export default (state = { tasks: [] }, action) => {
  switch (action.type) {
    case FETCH_TASKS_SUCCESS: {
      return {...state, fetching: true}
    }

    case SAVE_TASK_SUCCESS:
    case FETCH_TASK_SUCCESS: {
      // temporary...
      return {...state, fetching: true};
    }

    default:
      return state;
  }
}
