import { Collection } from "./collectionType";

export enum FeedItemActionType {
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
  author: string;
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
  feedItem: FeedItem;
  loading: boolean;
  error?: string | null;
}
