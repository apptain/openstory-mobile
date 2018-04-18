import { take, put, call, fork } from 'redux-saga/effects';

import * as actionKeys from '../actionKeys';
import {objectToArray} from "../utils";

function* profileGetFetch(apiCall, jwt) {
  const {response, error} = yield call(apiCall, jwt);
  if(response) {
    const me = response;
    //TODO somewhere better for this transform to live?
    yield put({ type: actionKeys.auth.PROFILE_GET_SUCCESS, me});
  } else {
    yield put({type: actionKeys.auth.PROFILE_GET_FAILURE, error});
  }
}

export function* watchProfileGetRequest() {
  while (true) {
    const { apiCall, jwt } = yield take(actionKeys.auth.PROFILE_GET_REQUEST);
    yield fork(profileGetFetch, apiCall, jwt);
  }
}
