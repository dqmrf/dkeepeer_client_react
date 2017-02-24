import axios             from 'axios';
import Actions           from '../constants/actions';
import cookie            from '../utils/cookie';
import getHeaders        from '../utils/getHeaders.js';
import redirectBackAfter from '../utils/redirectBackAfter';

// i've changed port for a while, because of rails server can't listening on port 3000
const baseUrl = 'http://localhost:3001';

const {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,

  LOGIN_SUCCESS,
  LOGIN_FAILURE,

  LOGOUT,

  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILURE,

  SAVE_PROFILE,
  SAVE_PROFILE_SUCCESS,
  SAVE_PROFILE_FAILURE
} = Actions;

function saveAuthToken(token) {
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  cookie.set({
    name: 'token',
    value: token,
    expires
  });
}

export function signup(email, password, router) {
  return async (dispatch) => {
    try {
      // it is temporary.
      let data = await axios.post(`${baseUrl}/api/users`, {
        user: {
          email,
          password
        }
      });
    } catch(e) {
      dispatch({
        type: SIGNUP_FAILURE,
        error: Error('Unknown error occured :-(. Please, try again later.')
      });
    }
  }
}

export function fetchProfile() {
  return async (dispatch, getState) => {
    try {
      const { auth: { token } } = getState();

      if (!token) { return; }

      const headers = getHeaders(token);
      const user = (await axios.get(`${baseUrl}/profile`, { headers })).data;
      dispatch({ type: FETCH_PROFILE_SUCCESS, user });
    } catch (error) {
      dispatch({ type: FETCH_PROFILE_FAILURE, error });
    }
  };
}
