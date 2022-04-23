import { useParams } from "react-router-dom";
import PostForm from "../components/post/PostForm";

const EditPostPage = () => {
  const { postId } = useParams();
  return <PostForm postId={postId} />;
};

export default EditPostPage;
