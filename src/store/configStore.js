import { configureStore, combineReducers } from "@reduxjs/toolkit";

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
});

export default store;
