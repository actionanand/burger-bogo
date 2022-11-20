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
    type: actionTypes.AUTH_INITIATE_LOGOUT
  };
}

// let timeOutId;

export const checkAuthTimeout = expirationTime => {
  // return dispatch => {
  //   timeOutId = setTimeout(() => {
  //     dispatch(logout());
  //   }, 1000 * expirationTime);
  // };

  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationTime
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
  return {
    type: actionTypes.AUTH_USER,
    email,
    password,
    isSignUp
  };
}