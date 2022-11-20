import { put, delay } from 'redux-saga/effects';

import axios from 'axios';

import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions/index';


export function* logoutSaga(action) {
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('userId');

  yield put(didLogout());

  // yield put({
  //   type: actionTypes.AUTH_LOGOUT
  // });

}

export const didLogout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authSaga({isSignUp, email, password}) {
  yield put(actions.authStart());
  
  const authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  let authPath = 'signUp';

  if (!isSignUp) {
    authPath = 'signInWithPassword';
  }

  const authData = {
    email,
    password,
    returnSecureToken: true
  };


  try {
    const resp = yield axios.post(authUrl + authPath + '?key=' + process.env.REACT_APP_AUTH_KEY, authData)
    
    const expirationDate = yield new Date(new Date().getTime() + (resp.data.expiresIn * 1000));
    yield localStorage.setItem('token', JSON.stringify(resp.data.idToken));
    yield localStorage.setItem('expirationDate', expirationDate);
    yield localStorage.setItem('userId', JSON.stringify(resp.data.localId));
  
    yield put(actions.authSuccess(resp.data.idToken, resp.data.localId));
    yield put(actions.checkAuthTimeout(resp.data.expiresIn));
  
  } catch (err) {
    yield put(actions.authFail(err.response.data.error));
  }
}