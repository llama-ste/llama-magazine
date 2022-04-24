import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  pagination: {},
  isLoading: false,
  preview: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPreview(state, action) {
      state.preview = action.payload;
    },
    addPost(state, action) {
      state.list.unshift(action.payload);
      state.isLoading = false;
    },
    getPosts(state, action) {
      const prevId = [];
      state.list.forEach((p) => prevId.push(p.id));
      const currId = [];
      action.payload.posts.forEach((p) => currId.push(p.id));

      const intersect = prevId.filter((id) => currId.includes(id));

      state.list = state.list.filter((p) => {
        return !intersect.includes(p.id);
      });

      state.list = [...state.list, ...action.payload.posts];
      state.pagination = action.payload.pagination;
      state.isLoading = false;
      state.isEmpty = false;
    },
    getOnePost(state, action) {
      state.list = [action.payload];
      state.isLoading = false;
    },
    updatePost(state, action) {
      const postId = Number(action.payload.postId);
      const post = action.payload.post;
      const idx = state.list.findIndex((p) => p.id === postId);

      state.list[idx] = post;
      state.isLoading = false;
    },
    deletePost(state, action) {
      const postId = Number(action.payload);

      state.list = state.list.filter((p) => {
        return p.id !== postId;
      });
    },
    resetPost(state) {
      state.list = [];
      state.pagination = {};
    },
    loading(state, action) {
      state.isLoading = action.payload;
    },
    likePost(state, action) {
      const postId = Number(action.payload.postId);
      const idx = state.list.findIndex((p) => p.id === postId);

      state.list[idx] = action.payload.post;
    },
    unlikePost(state, action) {
      const postId = Number(action.payload.postId);
      const idx = state.list.findIndex((p) => p.id === postId);

      state.list[idx] = action.payload.post;
    },
  },
});

export const postActions = postSlice.actions;
export default postSlice;
