import {
  CollectionActionType,
  CollectionAction,
  Collection,
} from "../../types/collectionType";
import { Dispatch } from "redux";
import { AnyAction } from "@reduxjs/toolkit";

const getMyCollectionsRequest = (): CollectionAction => ({
  type: CollectionActionType.GET_MYCOLLECTIONS_REQUEST,
  loading: true,
  error: null,
});

const getMyCollectionsSuccess = (collection: Collection): CollectionAction => ({
  type: CollectionActionType.GET_MYCOLLECTIONS_SUCCESS,
  loading: false,
  payload: collection,
});

const getMyCollectionsFailure = (error: string): CollectionAction => ({
  type: CollectionActionType.GET_MYCOLLECTIONS_FAILURE,
  loading: false,
  error: error,
});

const getCollectionRequest = (): CollectionAction => ({
  type: CollectionActionType.GET_COLLECTION_REQUEST,
  loading: true,
  error: null,
});

const getCollectionSuccess = (collection: Collection): CollectionAction => ({
  type: CollectionActionType.GET_COLLECTION_SUCCESS,
  loading: false,
  payload: collection,
});

const getCollectionFailure = (error: string): CollectionAction => ({
  type: CollectionActionType.GET_COLLECTION_FAILURE,
  loading: false,
  error: error,
});

const postCollectionRequest = (): CollectionAction => ({
  type: CollectionActionType.POST_COLLECTION_REQUEST,
  loading: true,
  error: null,
});

const postCollectionSuccess = (collection: Collection): CollectionAction => ({
  type: CollectionActionType.POST_COLLECTION_SUCCESS,
  loading: false,
  payload: collection,
});

const postCollectionFailure = (error: string): CollectionAction => ({
  type: CollectionActionType.POST_COLLECTION_FAILURE,
  loading: false,
  error: error,
});

const editCollectionRequest = (): CollectionAction => ({
  type: CollectionActionType.UPDATE_COLLECTION_REQUEST,
  loading: true,
  error: null,
});

const editCollectionSuccess = (collection: Collection): CollectionAction => ({
  type: CollectionActionType.UPDATE_COLLECTION_SUCCESS,
  loading: false,
  payload: collection,
});

const editCollectionFailure = (error: string): CollectionAction => ({
  type: CollectionActionType.UPDATE_COLLECTION_FAILURE,
  loading: false,
  error: error,
});

const deleteCollectionRequest = (): CollectionAction => ({
  type: CollectionActionType.DELETE_COLLECTION_REQUEST,
  loading: true,
});

const deleteCollectionSuccess = (): CollectionAction => ({
  type: CollectionActionType.DELETE_COLLECTION_SUCCESS,
  loading: false,
});

const deleteCollectionFailure = (error: string): CollectionAction => ({
  type: CollectionActionType.DELETE_COLLECTION_FAILURE,
  loading: false,
  error: error,
});

export const getMyCollections = (username: string) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(getMyCollectionsRequest());
    try {
      const response = await fetch(
        `http://localhost:8080/api/creatives/${username}/collections`
      );
      if (response.ok) {
        const data = await response.json();
        dispatch(getMyCollectionsSuccess(data));
        return data;
      } else {
        throw new Error("Failed to get collections");
      }
    } catch (error: unknown | Error) {
      if (error instanceof Error) {
        dispatch(getMyCollectionsFailure(error.message));
      } else {
        dispatch(
          getCollectionFailure(
            "An unknown error occurred while getting the collection."
          )
        );
      }
    }
  };
};

export const getCollection = (id: number) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(getCollectionRequest());
    try {
      const response = await fetch(
        `http://localhost:8080/api/collections/${id}`
      );
      if (response.ok) {
        const data = await response.json();
        dispatch(getCollectionSuccess(data));
        return data;
      } else {
        throw new Error("Failed to get collection");
      }
    } catch (error: unknown | Error) {
      if (error instanceof Error) {
        dispatch(getCollectionFailure(error.message));
      } else {
        dispatch(
          getCollectionFailure(
            "An unknown error occurred while getting the collection."
          )
        );
      }
    }
  };
};

export const createCollection = (token: string, collection: Collection) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(postCollectionRequest());
    try {
      const formData = new FormData();
      formData.append("title", collection.title || "");
      formData.append("description", collection.description || "");
      formData.append("category", collection.category || "");
      if (collection.coverImage) {
        formData.append("coverImage", collection.coverImage);
      }
      formData.append("keywords", (collection.keywords || []).join(","));

      const response = await fetch("http://localhost:8080/api/collections", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        dispatch(postCollectionSuccess(data));
      } else {
        throw new Error("Failed to post collection");
      }
    } catch (error: unknown | Error) {
      if (error instanceof Error) {
        dispatch(postCollectionFailure(error.message));
      } else {
        dispatch(
          postCollectionFailure(
            "An unknown error occurred while posting the collection."
          )
        );
      }
    }
  };
};

export const editCollection = (
  token: string,
  id: string,
  collection: Collection
) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(editCollectionRequest());
    try {
      const formData = new FormData();
      formData.append("title", collection.title || "");
      formData.append("description", collection.description || "");
      formData.append("category", collection.category || "");
      if (collection.coverImage) {
        formData.append("coverImage", collection.coverImage);
      }
      formData.append("keywords", (collection.keywords || []).join(", "));

      const response = await fetch(
        `http://localhost:8080/api/collections/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        dispatch(editCollectionSuccess(data));
      } else {
        throw new Error("Failed to edit collection");
      }
    } catch (error: unknown | Error) {
      if (error instanceof Error) {
        dispatch(editCollectionFailure(error.message));
      } else {
        dispatch(
          editCollectionFailure(
            "An unknown error occurred while editing the collection."
          )
        );
      }
    }
  };
};

export const deleteCollection = (id: string, token: string) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(deleteCollectionRequest());
    try {
      const response = await fetch(
        `http://localhost:8080/api/collections/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        dispatch(deleteCollectionSuccess());
        return console.log("collection deleted successfully");
      } else {
        throw new Error("Failed reading collection");
      }
    } catch (error: unknown | Error) {
      if (error instanceof Error) {
        dispatch(deleteCollectionFailure(error.message));
      } else {
        dispatch(
          deleteCollectionFailure(
            "An unknown error occurred while deleting the collection."
          )
        );
      }
    }
  };
};
