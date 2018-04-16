import * as actionKeys from '../actionKeys';

const init = {
  storiesFilter: '',
  stories: [],
  storiesLoading: false,
  categories: [],
  categoriesLoading: false,
  story: {},
  storyEdit: {},
  storyUpserting: false,
  exception: null,
}

export default (state = init, action) => {
  switch (action.type) {
    case actionKeys.storyActionKeys.STORY_CHANGE:
      return {...state, storyEdit: action.storyEdit};
    case actionKeys.storyActionKeys.STORIES_GET_REQUEST:
      return { ...state, storiesLoading : true};
    case actionKeys.storyActionKeys.STORIES_GET_SUCCESS:
      return { ...state, stories: action.stories, storiesLoading: false};
    case actionKeys.storyActionKeys.STORIES_GET_FAILURE:
      //TODO add toast notifications
      return { ...state, exception: action.exception, storiesLoading: false};
    case actionKeys.storyActionKeys.STORY_UPSERT_REQUEST:
      return { ...state, storyUpserting : true};
    case actionKeys.storyActionKeys.STORY_UPSERT_SUCCESS:
      return { ...state, story: action.story, storyUpserting: false, storyEdit: {}, stories: [...state.stories, action.story]};
    case actionKeys.storyActionKeys.STORY_UPSERT_FAILURE:
      //TODO add toast notifications
      return { ...state, exception: action.exception, storyUpserting: false};
    case actionKeys.storyActionKeys.STORY_UPSERT_FAILURE:
      //TODO add toast notifications
      return { ...state, exception: action.exception, storyUpserting: false};
    case actionKeys.storyActionKeys.CATEGORIES_GET_REQUEST:
      return { ...state, categoriesLoading : true};
    case actionKeys.storyActionKeys.CATEGORIES_GET_SUCCESS:
      return { ...state, categories: action.categories, categoriesLoading: false};
    case actionKeys.storyActionKeys.CATEGORIES_GET_FAILURE:
      //TODO add toast notifications
    case actionKeys.storyActionKeys.STORY_SELECT:
      return {...state, story: action.story};
    default:
      return state
  }
};