import {callApi} from './utils';
import * as endpoints from './endpoints';

//callApi gets lost from scope in apiCalls without this
const scopedCallApi = callApi;

export const storiesGet = filter => {
  //TODO pass and handle filter
  return scopedCallApi(endpoints.storiesGetUrl);
};

export const storyUpsert = (story, token) => {
  var headers = { 'Content-Type': 'application/json', 'mode': 'cors', 'Authorization': `Bearer ${token}` };
  return scopedCallApi(endpoints.storyUpsertUrl, 'POST', JSON.stringify(story), headers);
};

export const profileGet = jwt => {
  var headers = { 'Content-Type': 'application/json', 'mode': 'cors', 'Authorization': `Bearer ${jwt}` };
  return scopedCallApi(endpoints.profileGetUrl, null, null, headers);
};
