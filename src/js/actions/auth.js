import axios             from 'axios';
import Actions           from '../constants/actions';
import cookie            from '../utils/cookie';
import getHeaders        from '../utils/getHeaders.js';
import prepareJson       from '../utils/prepareJson';
import redirectBackAfter from '../utils/redirectBackAfter';

// i've changed port for a while, because of rails server can't listening on port 3000
const baseUrl = 'http://localhost:3001';
const headers = {'Content-Type': 'application/json'} 

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

export function signup(data, router) {
  return async (dispatch) => {
    try {
      let url = `${baseUrl}/api/users`;
      let body = prepareJson({user: data});
      const res = await axios.post(url, body, { headers: headers });

      if (res && res.status == 200) {
        const { query } = router.location;
        const redirectTo = (query && query.redirectTo) ? query.redirectTo : '/login';
        router.push(redirectTo);
      }
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
