import { combineReducers } from "redux";
//import loginReducer from "../reducers/loginReducer";
//import registerReducer from "../reducers/registerReducer";
//import creativeReducer from "../reducers/creativeReducer";
//import portfolioReducer from "../reducers/portfolioReducer";
//import feedReducer from "../reducers/feedReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  //login: loginReducer,
  //register: registerReducer,
  //me: creativeReducer,
  //creative: creativeReducer,
  //portfolio: portfolioReducer,
  //feed: feedReducer,
});

const RESET_STORE = "RESET_STORE";

export const resetStoreAction = { type: RESET_STORE };

const resettableReducer = (state: any, action: any) => {
  if (action.type === RESET_STORE) {
    state = undefined;
  }
  return rootReducer(state, action);
};

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, resettableReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
