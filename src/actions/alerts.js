import Actions from '../constants/actions';

const {
  ADD_ALERT_ASYNC,
  REMOVE_ALERT_ASYNC
} = Actions;

export function addAlertAsync (inputParams) {
  if (!inputParams.message) { return; }

  let params = Object.assign({}, {
    type: 'success',
    delay: 4000
  }, inputParams);

  return function(dispatch) {
    let { message, type, delay } = params;

    dispatch({ 
      type: ADD_ALERT_ASYNC,
      kind: type,
      message: message
    })

    setTimeout(() => {
      dispatch({
        type: REMOVE_ALERT_ASYNC
      });
    }, delay)
  }
}

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
