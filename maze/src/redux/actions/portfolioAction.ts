import { Dispatch } from "redux";
import {
  PortfolioActionType,
  PortfolioAction,
  Portfolio,
} from "../../types/portfolioType";
import { AnyAction } from "@reduxjs/toolkit";

const getPortfolioRequest = (): PortfolioAction => ({
  type: PortfolioActionType.GET_PORTFOLIO_REQUEST,
  loading: true,
  error: null,
});

const getPortfolioSuccess = (payload: Portfolio): PortfolioAction => ({
  type: PortfolioActionType.GET_PORTFOLIO_SUCCESS,
  payload: payload,
  loading: false,
  error: null,
});

const getPortfolioFailure = (error: string): PortfolioAction => ({
  type: PortfolioActionType.GET_PORTFOLIO_FAILURE,
  loading: false,
  error: error,
});

export const getPortfolio = (username: string) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch(getPortfolioRequest());
    try {
      const response = await fetch(
        `http://localhost:8080/api/creatives/${username}/portfolio`
      );
      if (response.ok) {
        const data = await response.json();
        dispatch(getPortfolioSuccess(data));
      } else {
        throw new Error("Failed reading portfolio");
      }
    } catch (error: unknown | Error) {
      if (error instanceof Error) {
        dispatch(getPortfolioFailure(error.message));
      } else {
        dispatch(
          getPortfolioFailure("An unknown error occurred reading portfolio.")
        );
      }
    }
  };
};
