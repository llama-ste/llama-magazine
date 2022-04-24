import styled from "styled-components";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Avatar,
  IconButton,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import PostLayout from "../layout/PostLayout";
import {
  likePostAxios,
  unlikePostAxios,
} from "../../store/thunk-actions/postActions";
import { getCookie } from "../../shared/cookie";

const Post = (props) => {
  const {
    content,
    created_at: createdAt,
    image_url: imageUrl,
    likes_count: likesCount,
    liked_by_me: likedByMe,
    user,
    layout,
    id: postId,
    isMe,
  } = props;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = getCookie("token");

  const likeHandler = () => {
    if (likedByMe === null) {
      window.alert("로그인이 필요합니다.");
    }

    if (likedByMe) {
      dispatch(unlikePostAxios(postId, token));
    } else {
      dispatch(likePostAxios(postId, token));
    }
  };

  return (
    <Card sx={{ mb: 3 }} elevation={2}>
      <PostWrapper onClick={() => navigate(`/posts/${postId}`)}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {user?.nickname[0].toUpperCase()}
            </Avatar>
          }
          title={user?.nickname}
          subheader={createdAt}
        />
        {layout === "top" && (
          <>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CardMedia
                component="img"
                sx={{ height: "30vh", width: "100%", objectFit: "contain" }}
                image={imageUrl}
                alt="img"
              />
            </div>
            <CardContent>
              <Typography color="text.secondary">{content}</Typography>
            </CardContent>
          </>
        )}
        {layout === "bottom" && (
          <div>
            <CardContent>
              <Typography color="text.secondary">{content}</Typography>
            </CardContent>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CardMedia
                component="img"
                sx={{ height: "30vh", width: "100%", objectFit: "contain" }}
                image={imageUrl}
                alt="img"
              />
            </div>
          </div>
        )}
        {layout === "left" && (
          <PostLayout layout={"left"}>
            <div style={{ width: "50%" }}>
              <CardMedia
                component="img"
                sx={{ height: "30vh", width: "100%", objectFit: "contain" }}
                image={imageUrl}
                alt="img"
              />
            </div>
            <CardContent sx={{ width: "50%" }}>
              <Typography color="text.secondary">{content}</Typography>
            </CardContent>
          </PostLayout>
        )}
        {layout === "right" && (
          <PostLayout layout={"right"}>
            <div style={{ width: "50%" }}>
              <CardMedia
                component="img"
                sx={{ height: "30vh", width: "100%", objectFit: "contain" }}
                image={imageUrl}
                alt="img"
              />
            </div>
            <CardContent sx={{ width: "50%" }}>
              <Typography color="text.secondary">{content}</Typography>
            </CardContent>
          </PostLayout>
        )}
      </PostWrapper>
      <CardActions
        disableSpacing
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={likeHandler}
            color={likedByMe ? "primary" : "default"}
            aria-label="like"
          >
            <FavoriteIcon />
          </IconButton>
          <span>{likesCount}개</span>
        </div>
        {isMe && (
          <Button
            sx={{ fontWeight: 900 }}
            size="small"
            variant="contained"
            onClick={() => navigate(`/edit-post/${postId}`)}
          >
            수정
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

const PostWrapper = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

export default Post;
