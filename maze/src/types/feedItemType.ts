import { Collection } from "./collectionType";
import { Creative } from "./creativeType";

export enum FeedItemActionType {
  GET_FEED_REQUEST = "GET_FEED_REQUEST",
  GET_FEED_SUCCESS = "GET_FEED_SUCCESS",
  GET_FEED_FAILURE = "GET_FEED_FAILURE",
  GET_FEEDITEM_REQUEST = "GET_FEEDITEM_REQUEST",
  GET_FEEDITEM_SUCCESS = "GET_FEEDITEM_SUCCESS",
  GET_FEEDITEM_FAILURE = "GET_FEEDITEM_FAILURE",
  POST_FEEDITEM_REQUEST = "POST_FEEDITEM_REQUEST",
  POST_FEEDITEM_SUCCESS = "POST_FEEDITEM_SUCCESS",
  POST_FEEDITEM_FAILURE = "POST_FEEDITEM_FAILURE",
  UPDATE_FEEDITEM_REQUEST = "UPDATE_FEEDITEM_REQUEST",
  UPDATE_FEEDITEM_SUCCESS = "UPDATE_FEEDITEM_SUCCESS",
  UPDATE_FEEDITEM_FAILURE = "UPDATE_FEEDITEM_FAILURE",
  DELETE_FEEDITEM_REQUEST = "DELETE_FEEDITEM_REQUEST",
  DELETE_FEEDITEM_SUCCESS = "DELETE_FEEDITEM_SUCCESS",
  DELETE_FEEDITEM_FAILURE = "DELETE_FEEDITEM_FAILURE",
}

export interface FeedItem {
  id: number;
  author: Creative;
  createdAt: string;
  collection: Collection;
  type: string;
  caption: string;
}

export interface FeedItemAction {
  type: FeedItemActionType;
  payload?: any;
  loading: boolean;
  error?: string | null;
}

export interface FeedItemState {
  feed: FeedItem[];
  feedItem: FeedItem;
  loading: boolean;
  error?: string | null;
}
