import Actions from '../constants/actions';

const { 
  ADD_ALERT_ASYNC, 
  REMOVE_ALERT_ASYNC 
} = Actions;

const initialState = {
  alertsAsync: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ALERT_ASYNC: {
      const { message, kind } = action;
      let alertsAsync = state.alertsAsync;

      alertsAsync.push({
        kind: kind, 
        message: message
      });

      return {
        ...state,
        alertsAsync
      }
    }

    case REMOVE_ALERT_ASYNC: {
      let alertsAsync = state.alertsAsync;
      
      alertsAsync.shift();

      return {
        ...state,
        alertsAsync
      }
    }

    default:
      return state;
  }
};
