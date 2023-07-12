import Role from "./roleType";

export enum CreativeActionType {
  GET_CREATIVE_REQUEST = "GET_CREATIVE_REQUEST",
  GET_CREATIVE_SUCCESS = "GET_CREATIVE_SUCCESS",
  GET_CREATIVE_FAILURE = "GET_CREATIVE_FAILURE",
  UPDATE_CREATIVE_REQUEST = "UPDATE_CREATIVE_REQUEST",
  UPDATE_CREATIVE_SUCCESS = "UPDATE_CREATIVE_SUCCESS",
  UPDATE_CREATIVE_FAILURE = "UPDATE_CREATIVE_FAILURE",
}

export interface Creative {
  id: number;
  username: string;
  email: string;
  password: string;
  registrationDate: string;
  roles: Role[];
  firstname: string;
  lastname: string;
  stageName: string;
  bio: string;
  city: string;
  state: string;
  image: string;
  skills: string[];
  professions: string[];
  portfolio: number;
}

export interface CreativeAction {
  type: CreativeActionType;
  payload?: any;
  loading: boolean;
  error?: string | null;
}

export interface CreativeState {
  creative: Creative;
  loading: boolean;
  error?: string | null;
}
