import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  isLoading: false,
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    addComment(state, action) {
      state.list.push(action.payload);
    },
    getComments(state, action) {
      state.list = action.payload;
      state.isLoading = false;
    },
    updateComment(state, action) {
      const idx = state.list.findIndex((c) => {
        return c.id === action.payload.commentId;
      });

      state.list[idx] = action.payload.comment;
    },
    deleteComment(state, action) {
      state.list = state.list.filter((c) => {
        return c.id !== action.payload;
      });
    },
    loading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const commentActions = commentSlice.actions;
export default commentSlice;
