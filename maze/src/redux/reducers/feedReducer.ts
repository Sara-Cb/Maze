import { FeedActionType, FeedAction, FeedState } from "../../types/feedType";

const initialState: FeedState = {
  feed: [],
  feedItem: {
    id: 0,
    author: {
      id: 0,
      username: "",
      email: "",
      password: "",
      registrationDate: "",
      roles: [],
      firstname: "",
      lastname: "",
      stageName: "",
      bio: "",
      city: "",
      state: "",
      image: "",
      skills: [],
      professions: [],
      portfolio: 0,
    },
    createdAt: "",
    collection: {
      id: 0,
      createdAt: "",
      updatedAt: "",
      title: "",
      description: "",
      category: "",
      coverImage: "",
      elaborates: [],
      keywords: [],
      singleElement: false,
      author: "",
    },
    type: "",
    caption: "",
  },
  loading: false,
  error: null,
};

const feedReducer = (state = initialState, action: FeedAction): FeedState => {
  switch (action.type) {
    case FeedActionType.GET_FEED_REQUEST:
    case FeedActionType.GET_FEEDITEM_REQUEST:
    case FeedActionType.POST_FEEDITEM_REQUEST:
    case FeedActionType.UPDATE_FEEDITEM_REQUEST:
    case FeedActionType.DELETE_FEEDITEM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FeedActionType.GET_FEED_SUCCESS:
      return {
        ...state,
        feed: action.payload,
        loading: false,
        error: null,
      };
    case FeedActionType.GET_FEEDITEM_SUCCESS:
    case FeedActionType.POST_FEEDITEM_SUCCESS:
    case FeedActionType.UPDATE_FEEDITEM_SUCCESS:
      return {
        ...state,
        feedItem: action.payload,
        loading: false,
        error: null,
      };
    case FeedActionType.DELETE_FEEDITEM_SUCCESS:
      return {
        ...state,
        feedItem: state.feedItem,
        loading: false,
        error: null,
      };
    case FeedActionType.GET_FEED_FAILURE:
    case FeedActionType.GET_FEEDITEM_FAILURE:
    case FeedActionType.POST_FEEDITEM_FAILURE:
    case FeedActionType.UPDATE_FEEDITEM_FAILURE:
    case FeedActionType.DELETE_FEEDITEM_FAILURE:
      return {
        ...state,
        loading: false,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        error: action.error!,
      };
    default:
      return state;
  }
};

export default feedReducer;
