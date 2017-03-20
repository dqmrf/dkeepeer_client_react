import Actions from '../constants/actions';
import cookie  from '../utils/cookie';

const {
  ROUTER_STATE_CHANGE,

  FETCHING_USER,

  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,

  EMAIL_CONFIRMATION_FULFILLED,
  EMAIL_CONFIRMATION_REJECTED,

  LOGOUT,
} = Actions;

const initialState = {
  token: cookie.get('token') || null,
  fetching: {
    signin: false,
    signup: false,
    confirmation: false
  },
  fetched: {
    signin: true,
    signup: true,
    confirmation: true
  },
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ROUTER_STATE_CHANGE: {
      return {
        ...state
      };
    }

    case FETCHING_USER: {
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

    case LOGIN_SUCCESS: {
      const { token } = action.payload;

      return {
        ...state,
        token: token,
        fetching: {
          ...state.fetching,
          signin: false
        },
        fetched: {
          ...state.fetched,
          signin: true
        },
        error: null,
      };
    } 

    case LOGIN_FAILURE: {
      const { error } = action.payload;

      return {
        ...state,
        fetching: {
          ...state.fetching,
          signin: false
        },
        fetched: {
          ...state.fetched,
          signin: true
        },
        error
      };
    }

    case SIGNUP_SUCCESS: {
      return {
        ...state,
        fetching: {
          ...state.fetching,
          signup: false
        },
        fetched: {
          ...state.fetched,
          signup: true
        },
        error: null,
      };
    } 

    case SIGNUP_FAILURE: {
      const { error } = action.payload;

      return {
        ...state,
        fetching: {
          ...state.fetching,
          signup: false
        },
        fetched: {
          ...state.fetched,
          signup: true
        },
        error
      };
    }

    case EMAIL_CONFIRMATION_FULFILLED: {
      return {
        ...state,
        fetching: {
          ...state.fetching,
          confirmation: false
        },
        fetched: {
          ...state.fetched,
          confirmation: true
        },
        error: action.payload
      };
    }

    case EMAIL_CONFIRMATION_REJECTED: {
      const { error } = action.payload;

      return {
        ...state,
        fetching: {
          ...state.fetching,
          confirmation: false
        },
        fetched: {
          ...state.fetched,
          confirmation: true
        },
        error
      };
    }

    case LOGOUT: {
      return { ...initialState };
    }

    default: {
      return state;
    }
  }
}
