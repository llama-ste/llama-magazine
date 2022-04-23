import { createSlice } from "@reduxjs/toolkit";

import { deleteCookie, setCookie } from "../../shared/cookie";

const initialState = {
  user: null,
  isLogin: false,
  isAvailable: false,
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signup(state, action) {
      setCookie("token", action.payload.token);
      state.user = action.payload.user;
      state.isLogin = true;
    },
    login(state, action) {
      setCookie("token", action.payload.token);
      state.user = action.payload.user;
      state.isLogin = true;
    },
    logout(state) {
      deleteCookie("token");
      state.user = null;
      state.isLogin = false;
    },
    idCheck(state, action) {
      state.isAvailable = action.payload.isAvailable;
      state.isLoading = false;
    },
    loginCheck(state, action) {
      if (!action.payload.isValid) {
        deleteCookie("token");
      }

      state.user = action.payload.user;
      state.isLogin = action.payload.isValid;
    },
    loading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
