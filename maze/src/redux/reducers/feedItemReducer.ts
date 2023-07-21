import {
  FeedItemActionType,
  FeedItemAction,
  FeedItemState,
} from "../../types/feedItemType";

const initialState: FeedItemState = {
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

const feedItemReducer = (
  state = initialState,
  action: FeedItemAction
): FeedItemState => {
  switch (action.type) {
    case FeedItemActionType.GET_FEED_REQUEST:
    case FeedItemActionType.GET_FEEDITEM_REQUEST:
    case FeedItemActionType.POST_FEEDITEM_REQUEST:
    case FeedItemActionType.UPDATE_FEEDITEM_REQUEST:
    case FeedItemActionType.DELETE_FEEDITEM_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FeedItemActionType.GET_FEED_SUCCESS:
      return {
        ...state,
        feed: action.payload,
        loading: false,
        error: null,
      };
    case FeedItemActionType.GET_FEEDITEM_SUCCESS:
    case FeedItemActionType.POST_FEEDITEM_SUCCESS:
    case FeedItemActionType.UPDATE_FEEDITEM_SUCCESS:
      return {
        ...state,
        feedItem: action.payload,
        loading: false,
        error: null,
      };
    case FeedItemActionType.DELETE_FEEDITEM_SUCCESS:
      return {
        ...state,
        feedItem: state.feedItem,
        loading: false,
        error: null,
      };
    case FeedItemActionType.GET_FEED_FAILURE:
    case FeedItemActionType.GET_FEEDITEM_FAILURE:
    case FeedItemActionType.POST_FEEDITEM_FAILURE:
    case FeedItemActionType.UPDATE_FEEDITEM_FAILURE:
    case FeedItemActionType.DELETE_FEEDITEM_FAILURE:
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

export default feedItemReducer;
