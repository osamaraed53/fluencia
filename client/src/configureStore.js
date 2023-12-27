// for Redux Persist
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage/session";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";


import AuthenticationAdminSlice from "./ReduxSlice/AuthenticationAdminSlice";
import taskSlice from "./ReduxSlice/taskSlice ";
import userTaskSlice from "./ReduxSlice/userTaskSlice";
import usersSlice from './ReduxSlice/usersSlice'
import courseUserSlice from "./ReduxSlice/courseUserSlice";
import courseSlice from "./ReduxSlice/courseSlice";
import AuthenticationSlice from "./ReduxSlice/AuthenticationSlice";
import searchSlice  from "./ReduxSlice/searchSlice";
import postOnCourseSlice from "./ReduxSlice/postOnCourseSlice";
import contactUsSlice from "./ReduxSlice/contactUsSlice";
import faqsSlice from "./ReduxSlice/faqsSlice";


const rootReducer = combineReducers({
  auth: AuthenticationSlice,
  authForAdmin: AuthenticationAdminSlice,
  user:usersSlice,
  course: courseSlice,
  courseUser: courseUserSlice,
  task:taskSlice,
  userTask :userTaskSlice,
  search:searchSlice,
  postOnCourse : postOnCourseSlice,
  contactUs : contactUsSlice, 
  faq : faqsSlice
});

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ['auth','authForAdmin']
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV == "production",
  middleware: [thunk],
});

export default store;
export const persistor = persistStore(store);
