import axios             from 'axios';
import Actions           from '../constants/actions';
import cookie            from '../utils/cookie';
import getHeaders        from '../utils/getHeaders.js';
import prepareJson       from '../utils/prepareJson';
import redirectBackAfter from '../utils/redirectBackAfter';

const {
  START_FETCHING,

  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,

  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,

  EMAIL_CONFIRMATION_FULFILLED,
  EMAIL_CONFIRMATION_REJECTED
} = Actions;
// i've changed port for a while, because of rails server can't listening on port 3000
const baseUrl = 'http://localhost:3001';
const headers = {'Content-Type': 'application/json'} 

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
      const url = `${baseUrl}/api/users`;
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

export function login(data, router) {
  return async (dispatch) => {
    try {
      const url = `${baseUrl}/oauth/token?client_id=482a0d9e4933364b5f66527be7416562aa49dfd94bbc2f7649559da4616449de&grant_type=password`;
      const { email, password } = data;
      let body = prepareJson({
        email: email,
        password: password
      });
      const res = await axios.post(url, body, { headers: headers });
      const { access_token } = res.data;

      if (res && res.status == 200 && access_token) {
        saveAuthToken(access_token);

        dispatch({ type: LOGIN_SUCCESS, access_token });

        const { query } = router.location;
        const redirectTo = (query && query.redirectTo) ? query.redirectTo : '/';
        router.push(redirectTo);
      }
    } catch (e) {
      dispatch({
        type: LOGIN_FAILURE,
        error: Error('Unknown error occured :-(. Please, try again later.')
      });
    }
  };
}

export function logout(router) {
  return dispatch => {
    cookie.unset('token');
    dispatch({ type: LOGOUT });
    router.push(...redirectBackAfter('/login', router.location));
  };
}

export function checkConfirmationToken(token) {
  return async (dispatch, getState) => {
    dispatch({ type: START_FETCHING });

    try {
      const res = await axios.get(`${baseUrl}/api/users/${token}/confirm_email`);

      if (res.status == 200) {
        const { message } = res.data;
        dispatch({ type: EMAIL_CONFIRMATION_FULFILLED, payload: message });
      }
    } catch (error) {
      dispatch({ type: EMAIL_CONFIRMATION_REJECTED, error });
    }
  }
}
