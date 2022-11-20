import { takeEvery, all } from 'redux-saga/effects';

import { logoutSaga, checkAuthTimeoutSaga, authSaga, authCheckStatusSaga } from './auth';
import * as actionTypes from '../actions/actionTypes';


export function* watchAuth() {
  // yield takeEvery(actionTypes.AUTH_CHECK_INITAIL_STATE, authCheckStatusSaga);
  // yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
  // yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  // yield takeEvery(actionTypes.AUTH_USER, authSaga);

  yield all([
    takeEvery(actionTypes.AUTH_CHECK_INITAIL_STATE, authCheckStatusSaga),
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_USER, authSaga)
  ]);
}