import { FeedActionType, FeedAction, FeedItem } from "../../types/feedType";
import { Dispatch } from "redux";
import { AnyAction } from "@reduxjs/toolkit";
import { parseISO } from "date-fns";

const getFeedRequest = (): FeedAction => ({
  type: FeedActionType.GET_FEED_REQUEST,
  loading: true,
  error: null,
});

const getFeedSuccess = (feed: FeedItem[]): FeedAction => ({
  type: FeedActionType.GET_FEED_SUCCESS,
  loading: false,
  payload: feed,
});

const getFeedFailure = (error: string): FeedAction => ({
  type: FeedActionType.GET_FEED_FAILURE,
  loading: false,
  error: error,
});
const getFeedItemRequest = (): FeedAction => ({
  type: FeedActionType.GET_FEEDITEM_REQUEST,
  loading: true,
  error: null,
});

const getFeedItemSuccess = (feedItem: FeedItem): FeedAction => ({
  type: FeedActionType.GET_FEEDITEM_SUCCESS,
  loading: false,
  payload: feedItem,
});

const getFeedItemFailure = (error: string): FeedAction => ({
  type: FeedActionType.GET_FEEDITEM_FAILURE,
  loading: false,
  error: error,
});

const postFeedItemRequest = (): FeedAction => ({
  type: FeedActionType.POST_FEEDITEM_REQUEST,
  loading: true,
  error: null,
});

const postFeedItemSuccess = (feedItem: FeedItem): FeedAction => ({
  type: FeedActionType.POST_FEEDITEM_SUCCESS,
  loading: false,
  payload: feedItem,
});

const postFeedItemFailure = (error: string): FeedAction => ({
  type: FeedActionType.POST_FEEDITEM_FAILURE,
  loading: false,
  error: error,
});

const editFeedItemRequest = (): FeedAction => ({
  type: FeedActionType.UPDATE_FEEDITEM_REQUEST,
  loading: true,
  error: null,
});

const editFeedItemSuccess = (feedItem: FeedItem): FeedAction => ({
  type: FeedActionType.UPDATE_FEEDITEM_SUCCESS,
  loading: false,
  payload: feedItem,
});

const editFeedItemFailure = (error: string): FeedAction => ({
  type: FeedActionType.UPDATE_FEEDITEM_FAILURE,
  loading: false,
  error: error,
});

const deleteFeedItemRequest = (): FeedAction => ({
  type: FeedActionType.DELETE_FEEDITEM_REQUEST,
  loading: true,
});

const deleteFeedItemSuccess = (): FeedAction => ({
  type: FeedActionType.DELETE_FEEDITEM_SUCCESS,
  loading: false,
});

const deleteFeedItemFailure = (error: string): FeedAction => ({
  type: FeedActionType.DELETE_FEEDITEM_FAILURE,
  loading: false,
  error: error,
});

export const getFeed = (token: string) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(getFeedRequest());
    try {
      const response = await fetch("http://localhost:8080/api/feed", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(getFeedSuccess(data));
        const unsortedFeedItems = data;

        const sortedFeedItems = unsortedFeedItems.sort(
          (item1: FeedItem, item2: FeedItem) => {
            const date1 = parseISO(item1.updatedAt || item1.createdAt);
            const date2 = parseISO(item2.updatedAt || item2.createdAt);
            return date2.getTime() - date1.getTime();
          }
        );

        return sortedFeedItems;
      } else {
        throw new Error("Failed to get feed");
      }
    } catch (error: unknown | Error) {
      if (error instanceof Error) {
        dispatch(getFeedFailure(error.message));
      } else {
        dispatch(
          getFeedFailure("An unknown error occurred while getting the feed.")
        );
      }
    }
  };
};

export const getFeedItem = (token: string, id: number) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(getFeedItemRequest());
    try {
      const response = await fetch(
        `http://localhost:8080/api/feed/items/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        dispatch(getFeedItemSuccess(data));
        return data;
      } else {
        throw new Error("Failed to get feedItem");
      }
    } catch (error: unknown | Error) {
      if (error instanceof Error) {
        dispatch(getFeedItemFailure(error.message));
      } else {
        dispatch(
          getFeedItemFailure(
            "An unknown error occurred while getting the feedItem."
          )
        );
      }
    }
  };
};

export const createFeedItem = (token: string, feedItem: FeedItem) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(postFeedItemRequest());
    try {
      const response = await fetch("http://localhost:8080/api/feed/items", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedItem),
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(postFeedItemSuccess(data));
        getFeed(token);
        return data;
      } else {
        throw new Error("Failed to post feedItem");
      }
    } catch (error: unknown | Error) {
      if (error instanceof Error) {
        dispatch(postFeedItemFailure(error.message));
      } else {
        dispatch(
          postFeedItemFailure(
            "An unknown error occurred while posting the feedItem."
          )
        );
      }
    }
  };
};

export const editFeedItem = (token: string, id: number, feedItem: FeedItem) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(editFeedItemRequest());
    try {
      const response = await fetch(
        `http://localhost:8080/api/feed/items/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(feedItem),
        }
      );
      if (response.ok) {
        const data = await response.json();
        dispatch(editFeedItemSuccess(data));
        getFeed(token);
        return data;
      } else {
        throw new Error("Failed to edit feedItem");
      }
    } catch (error: unknown | Error) {
      if (error instanceof Error) {
        dispatch(editFeedItemFailure(error.message));
      } else {
        dispatch(
          editFeedItemFailure(
            "An unknown error occurred while editing the feedItem."
          )
        );
      }
    }
  };
};

export const deleteFeedItem = (id: number, token: string) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(deleteFeedItemRequest());
    try {
      const response = await fetch(
        `http://localhost:8080/api/feed/items/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        dispatch(deleteFeedItemSuccess());
        getFeed(token);
        return console.log("feedItem deleted successfully");
      } else {
        throw new Error("Failed reading feedItem");
      }
    } catch (error: unknown | Error) {
      if (error instanceof Error) {
        dispatch(deleteFeedItemFailure(error.message));
      } else {
        dispatch(
          deleteFeedItemFailure(
            "An unknown error occurred while deleting the feedItem."
          )
        );
      }
    }
  };
};
