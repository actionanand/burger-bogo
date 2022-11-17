import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
}

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId
  };
}

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  };
}

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
}

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
}

export const auth = (email, password, isSignUp = true) => {
  const authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  let authPath = 'signUp';

  if (!isSignUp) {
    authPath = 'signInWithPassword';
  }

  return dispatch => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true
    };

    axios.post(authUrl + authPath + '?key=' + process.env.REACT_APP_AUTH_KEY, authData)
      .then(resp => {
        console.log(resp);
        dispatch(authSuccess(resp.data.idToken, resp.data.localId));
        dispatch(checkAuthTimeout(resp.data.expiresIn));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err.response.data.error));
      })
  };
}