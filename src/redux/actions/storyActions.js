import * as actionKeys from '../actionKeys';

export const storyChange = storyEdit => {
  debugger;
  return {type: actionKeys.storyActionKeys.STORY_CHANGE, storyEdit};
};

export const storiesGet = (apiCall, filter) => {
  debugger;
  return {type: actionKeys.storyActionKeys.STORIES_GET_REQUEST, apiCall, filter};
};

export const storyUpsert = (apiCall, story, token) => {
  return {type: actionKeys.storyActionKeys.STORY_UPSERT_REQUEST, apiCall, story, token};
};

export const storySelect = (story) => {
  return {type: actionKeys.storyActionKeys.STORY_SELECT, story};
};