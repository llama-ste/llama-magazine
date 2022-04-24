import { configureStore, combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";

import userSlice from "./slices/userSlice";
import postSlice from "./slices/postSlice";
import commentSlice from "./slices/commentSlice";

const rootReducer = combineReducers({
  user: userSlice.reducer,
  post: postSlice.reducer,
  comment: commentSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
