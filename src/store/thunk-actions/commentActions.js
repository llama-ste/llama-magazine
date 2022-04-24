import { commentActions } from "../slices/commentSlice";
import { instance } from "../../services/axios";

export const addCommentAxios = (postId, comment, token) => {
  return async function (dispatch) {
    try {
      const response = await instance.post(
        `/posts/${postId}/comments`,
        {
          content: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(commentActions.addComment(response.data));
    } catch (err) {
      console.log("댓글 작성 실패 : ", err.response);
    }
  };
};

export const getCommentsAxios = (postId, token) => {
  return async function (dispatch) {
    dispatch(commentActions.loading(true));

    try {
      const response = await instance.get(`/posts/${postId}/comments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(commentActions.getComments(response.data.comments));
    } catch (err) {
      dispatch(commentActions.loading(false));
      console.log("코멘트 가져오기 실패 : ", err.response);
    }
  };
};

export const updateCommentAxios = (postId, commentId, content, token) => {
  return async function (dispatch) {
    try {
      const response = await instance.patch(
        `posts/${postId}/comments/${commentId}`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(
        commentActions.updateComment({ commentId, comment: response.data })
      );
    } catch (err) {
      console.log("코멘트 업데이트 실패 : ", err.response);
    }
  };
};

export const deleteCommentAxios = (postId, commentId, token) => {
  return async function (dispatch) {
    try {
      await instance.delete(`posts/${postId}/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(commentActions.deleteComment(commentId));
    } catch (err) {
      console.log("코멘트 삭제 실패 : ", err.response);
    }
  };
};
