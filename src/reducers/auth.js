import Actions from '../constants/actions';

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
  token: null,
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
        error: action.payload
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
        error: action.payload
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

    case LOGOUT: {
      return { ...initialState };
    }

    default: {
      return state;
    }
  }
}
