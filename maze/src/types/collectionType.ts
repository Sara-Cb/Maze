import { Creative } from "./creativeType";
import { Elaborate } from "./elaborateType";
import { Portfolio } from "./portfolioType";
//import { Project } from "./projectType";

export enum CollectionActionType {
  GET_COLLECTION_REQUEST = "GET_COLLECTION_REQUEST",
  GET_COLLECTION_SUCCESS = "GET_COLLECTION_SUCCESS",
  GET_COLLECTION_FAILURE = "GET_COLLECTION_FAILURE",
  POST_COLLECTION_REQUEST = "POST_COLLECTION_REQUEST",
  POST_COLLECTION_SUCCESS = "POST_COLLECTION_SUCCESS",
  POST_COLLECTION_FAILURE = "POST_COLLECTION_FAILURE",
  UPDATE_COLLECTION_REQUEST = "UPDATE_COLLECTION_REQUEST",
  UPDATE_COLLECTION_SUCCESS = "UPDATE_COLLECTION_SUCCESS",
  UPDATE_COLLECTION_FAILURE = "UPDATE_COLLECTION_FAILURE",
  DELETE_COLLECTION_REQUEST = "DELETE_COLLECTION_REQUEST",
  DELETE_COLLECTION_SUCCESS = "DELETE_COLLECTION_SUCCESS",
  DELETE_COLLECTION_FAILURE = "DELETE_COLLECTION_FAILURE",
}

export interface Collection {
  id: number;
  author: Creative;
  portfolio: Portfolio;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  category: string;
  coverImage: string;
  keywords: string[];
  elaborates: Elaborate[];
  //project: Project;
  singleElement: boolean;
}

export interface CollectionAction {
  type: CollectionActionType;
  payload?: any;
  loading: boolean;
  error?: string | null;
}

export interface CollectionState {
  collection: Collection;
  loading: boolean;
  error?: string | null;
}
