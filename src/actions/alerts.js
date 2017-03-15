import Actions from '../constants/actions';

const {
  ADD_ALERT_ASYNC,
  REMOVE_ALERT_ASYNC
} = Actions;

export function addAlertAsync(params) {
  return function(dispatch) {
    let { message, kind } = params;

    if (!message) { return; }
    if (!kind) { kind = 'success'; }

    dispatch({ 
      type: ADD_ALERT_ASYNC,
      kind: kind,
      message: message
    })

    setTimeout(() => {
      dispatch({
        type: REMOVE_ALERT_ASYNC
      });
    })
  }
}

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
