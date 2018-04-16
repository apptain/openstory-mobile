import * as actionKeys from '../actionKeys';

export const profileGet = (apiCall, jwt) => {
  return {type: actionKeys.auth.PROFILE_GET_REQUEST, apiCall, jwt};
};

export const oAuthLoginRequested = (provider) => {
  return {type: actionKeys.auth.OAUTH_LOGIN_REQUESTED};
};

export const oAuthLoginSuccess = (jwt, provider) => {
  //TODO action has double duty to a saga and directly to a reducer, separate
  return {type: actionKeys.auth.OAUTH_LOGIN_SUCCESS, jwt, provider};
};