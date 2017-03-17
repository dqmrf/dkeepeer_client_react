import axios             from 'axios';
import config            from 'app-config';
import { addAlertAsync } from './alerts';
import Actions           from '../constants/actions';
import cookie            from '../utils/cookie';
import getHeaders        from '../utils/getHeaders.js';
import prepareJson       from '../utils/prepareJson';
import redirectBackAfter from '../utils/redirectBackAfter';

const {
  FETCHING_USER,

  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,

  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,

  EMAIL_CONFIRMATION_FULFILLED,
  EMAIL_CONFIRMATION_REJECTED
} = Actions;

const baseUrl = config.baseUrl;
const apiEndpoint = `${baseUrl}/api`;
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
  return (dispatch) => {
    dispatch({ type: FETCHING_USER });

    const url = `${apiEndpoint}/users`;
    const body = prepareJson({user: data});

    axios.post(url, body, { headers: headers })
      .then((res) => {
        if (res && res.status == 200) {
          const { query } = router.location;
          const redirectTo = (query && query.redirectTo) ? query.redirectTo : '/login';

          router.push(redirectTo);

          addAlertAsync({
            message: 'Registration successfully! Please confirm your email addres.'
          })(dispatch);
        }
      })
      .catch(function (e) {
        dispatch({
          type: SIGNUP_FAILURE,
          error: Error('Unknown error occured :-(. Please, try again later.')
        });
      });
  }
}

export function login(data, router) {
  return (dispatch) => {
    dispatch({ type: FETCHING_USER });

    const url = `${baseUrl}/oauth/token?client_id=${config.clientId}&grant_type=password`;
    const { email, password } = data;
    const body = prepareJson({
      email: email,
      password: password
    });

    axios.post(url, body, { headers: headers })
      .then((res) => {
        if (res && res.status == 200) {
          const { access_token } = res.data;
          const { query } = router.location;
          const redirectTo = (query && query.redirectTo) ? query.redirectTo : '/';

          saveAuthToken(access_token);

          dispatch({ type: LOGIN_SUCCESS, payload: {
            token: access_token
          } });

          router.push(redirectTo);

          addAlertAsync({
            message: 'Login successfully'
          })(dispatch);
        }
      })
      .catch(function (e) {
        dispatch({
          type: LOGIN_FAILURE,
          error: Error('Unknown error occured :-(. Please, try again later.')
        });
      });
  };
}

export function logout(router) {
  return dispatch => {
    cookie.unset('token');
    dispatch({ type: LOGOUT });
    addAlertAsync({
      message: 'Logout successfully'
    })(dispatch);
    router.push(...redirectBackAfter('/login', router.location));
  };
}

export function checkConfirmationToken(token, router) {
  return async (dispatch) => {
    dispatch({ type: FETCHING_USER });
    
    axios.get(`${apiEndpoint}/users/${token}/confirm_email`)
      .then((res) => {
        if (res.status == 200) {
          const { message } = res.data;

          dispatch({ type: EMAIL_CONFIRMATION_FULFILLED, payload: message });
        }
      })
      .catch(function (e) {
        dispatch({ type: EMAIL_CONFIRMATION_REJECTED, e });
        router.push(...redirectBackAfter('/login', router.location));
      });
  }
}
