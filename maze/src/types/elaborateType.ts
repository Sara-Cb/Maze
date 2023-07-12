export enum ElaborateActionType {
  GET_ELABORATE_REQUEST = "GET_ELABORATE_REQUEST",
  GET_ELABORATE_SUCCESS = "GET_ELABORATE_SUCCESS",
  GET_ELABORATE_FAILURE = "GET_ELABORATE_FAILURE",
  POST_ELABORATE_REQUEST = "POST_ELABORATE_REQUEST",
  POST_ELABORATE_SUCCESS = "POST_ELABORATE_SUCCESS",
  POST_ELABORATE_FAILURE = "POST_ELABORATE_FAILURE",
  UPDATE_ELABORATE_REQUEST = "UPDATE_ELABORATE_REQUEST",
  UPDATE_ELABORATE_SUCCESS = "UPDATE_ELABORATE_SUCCESS",
  UPDATE_ELABORATE_FAILURE = "UPDATE_ELABORATE_FAILURE",
  DELETE_ELABORATE_REQUEST = "DELETE_ELABORATE_REQUEST",
  DELETE_ELABORATE_SUCCESS = "DELETE_ELABORATE_SUCCESS",
  DELETE_ELABORATE_FAILURE = "DELETE_ELABORATE_FAILURE",
}

export interface Elaborate {
  id: number;
  file: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  author: string;
  collection: number;
}

export interface ElaborateAction {
  type: ElaborateActionType;
  payload?: any;
  loading: boolean;
  error?: string | null;
}

export interface ElaborateState {
  elaborate: Elaborate;
  loading: boolean;
  error?: string | null;
}
