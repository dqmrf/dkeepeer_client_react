import { addAlertAsync } from '../actions/alerts';

export default class ErrorThrower {
  constructor(dispatch, params) {
    this.dispatch = dispatch;
    this.params = params;
  }

  handleError(err, callback) {
    if (callback && this._performCallback(callback) === false) { return; }

    const { type } = this.params;
    const { response } = err;
    const { 
      error,
      errors, 
      message, 
      error_description 
    } = response.data;

    let errorFiltered = (
      message || 
      error_description || 
      (error ? this._getDoorkeeperError(error, response.status) : null)
    );

    if (errors && errors.length) {
      errors.forEach((error, i) => {
        this._throwAlert(error)
      });
      this._emit(type, errors);
    } else if (errorFiltered) {
      this._throwAlert(errorFiltered);
      this._emit(type, errorFiltered);
    } else {
      return Promise.reject(err);
    }
  }

  handleUnknownError(err, callback) {
    const { dispatch, params: { type } } = this;
    let errorMsg = 'Unknown error occured! Please, try again later.';

    this._performCallback(callback);

    if (dispatch && type) {
      dispatch({ type: type, error: err || null });
    }

    this._throwAlert(errorMsg, dispatch);
  }

  _emit(type, payload) {
    type ? this.dispatch({ type, payload }) : null;
  }

  _throwAlert(message, dispatch) {
    addAlertAsync({
      message, 
      type: 'danger',
      delay: 6000
    })(this.dispatch);
  }

  _performCallback(cb) {
    if (cb && typeof cb === 'function') { return cb(); }
  }

  _getDoorkeeperError(error, status) {
    let message = error;

    switch (status) {
      case 401: {
        return 'You should to login before continuing';
      }
      default: {
        return message;
      }
    } 
  }
}
