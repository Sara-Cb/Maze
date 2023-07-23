import {
  PortfolioActionType,
  PortfolioAction,
  PortfolioState,
} from "../../types/portfolioType";

const initialState: PortfolioState = {
  portfolio: {
    id: 0,
    creative: {
      username: "",
      email: "",
      password: "",
      roles: [],
      registrationDate: "",
      firstname: "",
      lastname: "",
      stageName: "",
      bio: "",
      city: "",
      state: "",
      image: "",
      skills: [],
      professions: [],
      portfolio: 0,
    },
    collections: [],
  },
  loading: false,
  error: null,
};

const portfolioReducer = (
  state = initialState,
  action: PortfolioAction
): PortfolioState => {
  switch (action.type) {
    case PortfolioActionType.GET_PORTFOLIO_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case PortfolioActionType.GET_PORTFOLIO_SUCCESS:
      return {
        ...state,
        portfolio: action.payload,
        loading: false,
        error: null,
      };
    case PortfolioActionType.GET_PORTFOLIO_FAILURE:
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

export default portfolioReducer;
