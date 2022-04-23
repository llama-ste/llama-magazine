import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Post from "../components/post/Post";
import Loader from "../components/ui/Loader";

const PostDetailPage = () => {
  const { postId } = useParams();
  const { uid } = useSelector((state) => state.user.user);

  const postList = useSelector((state) => state.post.list);

  const post = postList.find((p) => {
    return p.id === Number(postId);
  });

  const isMe = post.user.id === uid;

  const isLoading = useSelector((state) => state.post.isLoading);

  return <>{isLoading ? <Loader /> : post && <Post {...post} isMe={isMe} />}</>;
};

export default PostDetailPage;
