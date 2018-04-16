import * as actionKeys from '../actionKeys';

//TODO add unit test to reducers to validate state changes
const init = {
  //key value pair of true/false or null[props]
  isLoggingInWithProvider: {},
  jwt: null,
  profile: null,
  user: null,
  isGettingProfile: false,
  gettingProfileError: null,
}

export default (state = init, action) => {
  switch (action.type) {
    case actionKeys.auth.OAUTH_LOGIN_REQUESTED:
      return { ...state,
        isLoggingInWithProvider : {...state.isLoggingInWithProvider, [action.provider]: true},
        loginError: null
      };
    case actionKeys.auth.OAUTH_LOGIN_SUCCESS:
      return { ...state,
        isLoggingInWithProvider: {...state.isLoggingInWithProvider, [action.provider]: false},
        loginError: null,
        jwt: action.jwt
      };
    case actionKeys.auth.OAUTH_LOGIN_FAILURE:
      return { ...state,
        isLoggingInWithProvider : {...state.isLoggingInWithProvider, [action.provider]: false},
        loginError: action.error
      };
    case actionKeys.auth.PROFILE_GET_REQUEST:
      return { ...state, isGettingProfile: true, gettingProfileError: null};
    case actionKeys.auth.PROFILE_GET_SUCCESS:
      return { ...state,
        isGettingProfile: false,
        gettingProfileError: null,
        user: action.me,
        session: action.session
      };
    case actionKeys.auth.PROFILE_GET_FAILURE:
      return { ...state, isGettingProfile: false, gettingProfileError: action.error};
    default:
      return state
  }
};

