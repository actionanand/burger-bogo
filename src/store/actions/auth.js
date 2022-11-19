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
  clearTimeout(timeOutId);
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('token');
  localStorage.removeItem('userId');

  return {
    type: actionTypes.AUTH_LOGOUT
  };
}

let timeOutId;

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    timeOutId = setTimeout(() => {
      dispatch(logout());
    }, 1000 * expirationTime);
  };
}

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = JSON.parse(localStorage.getItem('token'));

    if(!token) {
      return;
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if(expirationDate >= new Date()) {
        const userId = JSON.parse(localStorage.getItem('userId'));
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      } else {
        return;
      }
    }
  };
};


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
        // console.log(resp);
        const expirationDate = new Date(new Date().getTime() + (resp.data.expiresIn * 1000));
        localStorage.setItem('token', JSON.stringify(resp.data.idToken));
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', JSON.stringify(resp.data.localId));

        dispatch(authSuccess(resp.data.idToken, resp.data.localId));
        dispatch(checkAuthTimeout(resp.data.expiresIn));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err.response.data.error));
      })
  };
}