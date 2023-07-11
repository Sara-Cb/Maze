import { Creative } from "./creativeType";
import { Collection } from "./collectionType";
//import { Project } from "./projectType";

export enum PortfolioActionType {
  GET_PORTFOLIO_REQUEST = "GET_PORTFOLIO_REQUEST",
  GET_PORTFOLIO_SUCCESS = "GET_PORTFOLIO_SUCCESS",
  GET_PORTFOLIO_FAILURE = "GET_PORTFOLIO_FAILURE",
}

export interface Portfolio {
  id: number;
  creative: Creative;
  collections: Collection[];
  //projects: Project[];
}

export interface PortfolioAction {
  type: PortfolioActionType;
  payload?: any;
  loading: boolean;
  error?: string | null;
}

export interface PortfolioState {
  portfolio: Portfolio;
  loading: boolean;
  error?: string | null;
}
