import Actions from '../constants/actions';

const {
  ROUTER_STATE_CHANGE,

  FETCHING_USER,

  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,

  SIGNUP_FAILURE,

  EMAIL_CONFIRMATION_FULFILLED,
  EMAIL_CONFIRMATION_REJECTED
} = Actions;

const initialState = {
  token: null,
  fetching: false,
  fetched: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ROUTER_STATE_CHANGE: {
      return {
        ...state,
        error: null
      };
    }

    case FETCHING_USER: {
      return {
        ...state,
        fetching: true,
        fetched: false
      };
    }

    case LOGIN_SUCCESS: {
      return {
        ...state,
        error: null,
        token: action.access_token
      };
    }

    case SIGNUP_FAILURE:
    case LOGIN_FAILURE: {
      return {
        ...state,
        error: action.error
      };
    }

    case LOGOUT: {
      return { ...initialState };
    }

    case EMAIL_CONFIRMATION_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true
      };
    }

    default: {
      return state;
    }
  }
}
