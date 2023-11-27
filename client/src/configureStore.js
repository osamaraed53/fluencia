import { configureStore } from "@reduxjs/toolkit";
import AuthenticationSlice from "./ReduxSlice/AuthenticationSlice";
import courseSlice from "./ReduxSlice/courseSlice";
import { combineReducers } from "redux";

// for Redux Persist

import storage from "redux-persist/lib/storage/session";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import AuthenticationAdminSlice from "./ReduxSlice/AuthenticationAdminSlice";

const rootReducer = combineReducers({
  auth: AuthenticationSlice,
  authForAdmin: AuthenticationAdminSlice,
  course: courseSlice,
});
const persistConfig = {
  key: "auth",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV == "production",
  middleware: [thunk],
});

export default store;
export const persistor = persistStore(store);
