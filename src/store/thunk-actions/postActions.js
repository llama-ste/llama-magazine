import { postActions } from "../slices/postSlice";
import { instance } from "../../services/axios";
import { userActions } from "../slices/userSlice";

export const addPostAxios = (content, imageUrl, layout, token, navigate) => {
  return async function (dispatch) {
    dispatch(postActions.loading(true));

    const post = {
      content,
      image: imageUrl,
      layout,
    };

    try {
      const response = await instance.post("/posts", post, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(postActions.addPost(response.data));
      navigate("/", { replace: true });
    } catch (err) {
      console.log("포스트 작성 실패 : ", err.response);
    }
  };
};

export const getPostsAxios = (token, page) => {
  return async function (dispatch) {
    dispatch(postActions.loading(true));
    try {
      const response = await instance.get(`/posts?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(
        postActions.getPosts({
          posts: response.data.posts,
          pagination: response.data.pagination,
        })
      );
    } catch (err) {
      dispatch(postActions.loading(false));
      console.log("포스트 리스트 가져오기 실패 :", err.response);
    }
  };
};

export const getOnePostAxios = (postId, token) => {
  return async function (dispatch) {
    dispatch(postActions.loading(true));

    try {
      if (token) {
        const response = await instance.get("/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = {
          email: response.data.email,
          nickname: response.data.nickname,
          uid: response.data.id,
        };

        dispatch(userActions.loginCheck({ user, isValid: true }));
      }

      const res = await instance.get(`/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(postActions.getOnePost(res.data));
    } catch (err) {
      console.log("포스트 하나 가져오기 실패 :", err.response);
    }
  };
};

export const updatePostAxios = (postId, updatePost, token, navigate) => {
  return async function (dispatch) {
    dispatch(postActions.loading(true));
    try {
      const response = await instance.patch(`/posts/${postId}`, updatePost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(postActions.updatePost({ postId, post: response.data }));
      navigate("/", { replace: true });
    } catch (err) {
      if (err.response.status === 401) {
        window.alert("로그인이 만료되었습니다.");
        await dispatch(userActions.logout());
        navigate("/signin", { replace: true });
      }
      console.log("게시글 수정 실패 : ", err.response);
    }
  };
};

export const deletePostAxios = (postId, token, navigate) => {
  return async function (dispatch) {
    try {
      await instance.delete(`/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate("/", { replace: true });
      dispatch(postActions.deletePost(postId));
    } catch (err) {
      console.log("포스트 삭제 실패 : ", err.response);
    }
  };
};

export const likePostAxios = (postId, token) => {
  return async function (dispatch) {
    try {
      const response = await instance.post(
        `/posts/${postId}/likes`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(postActions.likePost({ postId, post: response.data }));
    } catch (err) {
      console.log("좋아요 실패 : ", err.response);
    }
  };
};

export const unlikePostAxios = (postId, token) => {
  return async function (dispatch) {
    try {
      const response = await instance.delete(`/posts/${postId}/likes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(postActions.unlikePost({ postId, post: response.data }));
    } catch (err) {
      console.log("좋아요 취소 실패 : ", err.response);
    }
  };
};
