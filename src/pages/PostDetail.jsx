import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import Post from "../components/post/Post";
import Loader from "../components/ui/Loader";
import CommentForm from "../components/comment/CommentForm";
import CommentList from "../components/comment/CommentList";
import { getCookie } from "../shared/cookie";
import { getOnePostAxios } from "../store/thunk-actions/postActions";

const PostDetailPage = () => {
  const { postId } = useParams();
  const token = getCookie("token");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const { list: postList, isLoading } = useSelector((state) => state.post);

  useEffect(() => {
    if (postList.length === 0) {
      dispatch(getOnePostAxios(postId, token));
    }
  }, [dispatch, postList, postId, token]);

  const post = postList.find((p) => {
    return p.id === Number(postId);
  });

  const isMe = post?.user?.id === user?.uid;

  return (
    <>
      {isLoading ? <Loader /> : post ? <Post {...post} isMe={isMe} /> : ""}
      {user && <CommentForm postId={postId} token={token} />}
      <CommentList postId={postId} token={token} />
    </>
  );
};

export default PostDetailPage;
