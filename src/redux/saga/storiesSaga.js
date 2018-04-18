import { take, put, call, fork, select } from 'redux-saga/effects';

import * as actionKeys from '../actionKeys';
import {objectToArray} from "../utils";

function* storiesGetFetch(apiCall, filter) {
  const {response, error} = yield call(apiCall, filter);
  if(response) {
    const stories = objectToArray(response);
    yield put({ type: actionKeys.storyActionKeys.STORIES_GET_SUCCESS, stories})
  } else {
    yield put({ type: actionKeys.storyActionKeys.STORIES_GET_FAILURE, error})
  }
}

export function* watchStoriesGetRequest() {
  while (true) {
    const { apiCall, filter } = yield take(actionKeys.storyActionKeys.STORIES_GET_REQUEST);
    yield fork(storiesGetFetch, apiCall, filter);
  }
}

function* storyUpsertFetch(apiCall, story, token) {
  const {response, error} = yield call(apiCall, story, token);
  if(response) {
    const story = response;
    yield put({ type: actionKeys.storyActionKeys.STORY_UPSERT_SUCCESS, story})
  } else {
    yield put({ type: actionKeys.storyActionKeys.STORY_UPSERT_FAILURE, error})
  }
}

export function* watchStoryUpsertRequest() {
  while (true) {
    const { apiCall, story, token } = yield take(actionKeys.storyActionKeys.STORY_UPSERT_REQUEST);
    yield fork(storyUpsertFetch, apiCall, story, token);
  }
}