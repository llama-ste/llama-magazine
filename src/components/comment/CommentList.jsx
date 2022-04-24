import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCommentsAxios } from "../../store/thunk-actions/commentActions";
import Comment from "./Comment";

const CommentList = ({ postId, token }) => {
  const dispatch = useDispatch();
  const { list: commentList, isLoading } = useSelector(
    (state) => state.comment
  );

  useEffect(() => {
    dispatch(getCommentsAxios(postId, token));
  }, [dispatch, postId, token]);

  return (
    <>
      {!isLoading &&
        commentList.map((comment) => {
          return (
            <Comment
              key={comment.id}
              {...comment}
              postId={postId}
              token={token}
            />
          );
        })}
    </>
  );
};

export default CommentList;
