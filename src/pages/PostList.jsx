import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import InfiniteScroll from "react-infinite-scroller";

import { getCookie } from "../shared/cookie";
import { getPostAxios } from "../store/thunk-actions/postActions";
import Post from "../components/post/Post";
import Loader from "../components/ui/Loader";

const PostListPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = getCookie("token");
  const { isLogin, user } = useSelector((state) => state.user);
  const {
    list: postList,
    isLoading,
    pagination,
  } = useSelector((state) => state.post);

  const fetchData = useCallback(() => {
    if (isLoading) {
      return;
    }
    const page = pagination.next_page !== undefined ? pagination.next_page : 1;

    dispatch(getPostAxios(token, page));
  }, [dispatch, token, isLoading, pagination]);

  const posts = postList.map((p) => {
    if (p.user.id === user?.uid) {
      return <Post key={`post ${p.id}`} {...p} isMe />;
    } else {
      return <Post key={`post ${p.id}`} {...p} />;
    }
  });

  return (
    <>
      <InfiniteScroll
        loadMore={fetchData}
        hasMore={pagination.next_page !== null}
        // https://github.com/danbovey/react-infinite-scroller/issues/133
        loader={<Loader key={0} />}
      >
        {posts}
      </InfiniteScroll>
      {token && isLogin && (
        <Fab
          sx={{ position: "fixed", bottom: "50px", right: "50px" }}
          onClick={() => navigate("/new-post")}
          color="primary"
          aria-label="add"
        >
          <AddIcon fontSize="large" />
        </Fab>
      )}
    </>
  );
};

export default PostListPage;
