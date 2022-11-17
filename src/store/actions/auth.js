import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
}

export const authSuccess = authData => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData
  };
}

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  };
}

export const auth = (email, password) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true
    };

    axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + process.env.REACT_APP_AUTH_KEY, authData)
      .then(resp => {
        console.log(resp);
        dispatch(authSuccess(resp.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err));
      })
  };
}