import { take, put, call, fork, select, all } from 'redux-saga/effects';

import {watchStoriesGetRequest, watchStoryUpsertRequest} from './storiesSaga';
import {watchProfileGetRequest} from './authSaga';

export default function* root() {
  debugger;
  yield all([
    fork(watchStoriesGetRequest),
    fork(watchStoryUpsertRequest),
    fork(watchProfileGetRequest)
  ]);
}
