import {
  CollectionActionType,
  CollectionAction,
  CollectionState,
} from "../../types/collectionType";

const initialState: CollectionState = {
  myCollections: [],
  collection: {
    id: 0,
    author: "",
    createdAt: "",
    updatedAt: "",
    title: "",
    description: "",
    category: "",
    coverImage: "",
    elaborates: [],
    keywords: [],
    singleElement: false,
  },
  loading: false,
  error: null,
};

const collectionReducer = (
  state = initialState,
  action: CollectionAction
): CollectionState => {
  switch (action.type) {
    case CollectionActionType.GET_MYCOLLECTIONS_REQUEST:
    case CollectionActionType.GET_COLLECTION_REQUEST:
    case CollectionActionType.POST_COLLECTION_REQUEST:
    case CollectionActionType.UPDATE_COLLECTION_REQUEST:
    case CollectionActionType.DELETE_COLLECTION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CollectionActionType.GET_COLLECTION_SUCCESS:
    case CollectionActionType.POST_COLLECTION_SUCCESS:
    case CollectionActionType.UPDATE_COLLECTION_SUCCESS:
      return {
        ...state,
        collection: action.payload,
        loading: false,
        error: null,
      };
    case CollectionActionType.GET_MYCOLLECTIONS_SUCCESS:
      return {
        ...state,
        myCollections: action.payload,
        loading: false,
        error: null,
      };
    case CollectionActionType.DELETE_COLLECTION_SUCCESS:
      return {
        ...state,
        collection: state.collection,
        loading: false,
        error: null,
      };
    case CollectionActionType.GET_COLLECTION_FAILURE:
    case CollectionActionType.GET_MYCOLLECTIONS_FAILURE:
    case CollectionActionType.POST_COLLECTION_FAILURE:
    case CollectionActionType.UPDATE_COLLECTION_FAILURE:
    case CollectionActionType.DELETE_COLLECTION_FAILURE:
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

export default collectionReducer;
