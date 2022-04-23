import {
  Button,
  ToggleButtonGroup,
  ToggleButton,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import StyledForm from "../layout/StyledForm";
import Loader from "../ui/Loader";
import ImageUpload from "../../shared/ImageUpload";
import PostLayout from "../layout/PostLayout";

import { getCookie } from "../../shared/cookie";
import { postActions } from "../../store/slices/postSlice";
import {
  addPostAxios,
  updatePostAxios,
  deletePostAxios,
} from "../../store/thunk-actions/postActions";

const PostForm = ({ postId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    preview,
    list: postList,
    isLoading,
  } = useSelector((state) => state.post);

  const isEdit = postId ? true : false;
  const post = isEdit ? postList.find((p) => p.id === Number(postId)) : null;
  const token = getCookie("token");
  const [layout, setLayout] = useState(post ? post.layout : "top");
  const [content, setContents] = useState(post ? post.content : "");
  const [prevView] = useState(post ? post.image_url : "");

  useEffect(() => {
    if (isEdit && !post) {
      window.alert("포스트 정보가 없습니다.");
      navigate("/", { replace: true });
      return;
    }

    if (isEdit) {
      dispatch(postActions.setPreview(post.image_url));
      setLayout(post.layout);
      setContents(post.contents);
    }

    return () => dispatch(postActions.setPreview(null));
  }, [dispatch, navigate, isEdit, post]);

  const changeContentsHandler = (e) => {
    setContents(e.target.value);
  };

  const addPostHandler = () => {
    dispatch(
      addPostAxios(content, preview, layout, token, (url, opt) => {
        navigate(url, opt);
      })
    );
  };

  const updatePostHandler = () => {
    if (prevView === preview) {
      const updatePost = {
        content,
        layout,
      };

      dispatch(
        updatePostAxios(postId, updatePost, token, (url, opt) => {
          navigate(url, opt);
        })
      );
    } else {
      const updatePost = {
        content,
        image: preview,
        layout,
      };

      dispatch(
        updatePostAxios(postId, updatePost, token, (url, opt) => {
          navigate(url, opt);
        })
      );
    }
  };

  const deletePostHandler = () => {
    dispatch(
      deletePostAxios(postId, token, (url, opt) => {
        navigate(url, opt);
      })
    );
  };

  return (
    <StyledForm postForm>
      {!token ? (
        <>
          <h2>로그인 후에만 글을 쓸 수 있어요.</h2>
          <Button
            onClick={() => navigate("/login", { replace: true })}
            sx={{ mb: 3 }}
            variant="contained"
            size="large"
          >
            로그인 하러가기
          </Button>
        </>
      ) : (
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <h2>{isEdit ? "게시글 수정" : "게시글 작성"}</h2>
              <ImageUpload />
              <ToggleButtonGroup
                color="primary"
                value={layout}
                onChange={(e) => setLayout(e.target.value)}
              >
                <ToggleButton value="top">이미지 위</ToggleButton>
                <ToggleButton value="bottom">이미지 아래</ToggleButton>
                <ToggleButton value="left">이미지 왼쪽</ToggleButton>
                <ToggleButton value="right">이미지 오른쪽</ToggleButton>
              </ToggleButtonGroup>
              {layout === "top" && (
                <PostLayout>
                  <Preview url={preview}>
                    {preview === null && <span>이미지 미리보기</span>}
                  </Preview>
                  <TextField
                    value={content}
                    sx={{ mt: 3, height: "100%" }}
                    multiline
                    minRows={5}
                    fullWidth
                    onChange={changeContentsHandler}
                    label="게시글 내용"
                    id="contents"
                  />
                </PostLayout>
              )}
              {layout === "bottom" && (
                <PostLayout>
                  <TextField
                    value={content}
                    sx={{ mb: 3 }}
                    multiline
                    rows={5}
                    fullWidth
                    onChange={changeContentsHandler}
                    label="게시글 내용"
                    id="contents"
                  />
                  <Preview url={preview}>
                    {preview === null && <span>이미지 미리보기</span>}
                  </Preview>
                </PostLayout>
              )}
              {layout === "left" && (
                <PostLayout layout={layout} postForm>
                  <Preview url={preview}>
                    {preview === null && <span>이미지 미리보기</span>}
                  </Preview>
                  <TextField
                    value={content}
                    multiline
                    sx={{ height: "100%" }}
                    minRows={5}
                    fullWidth
                    onChange={changeContentsHandler}
                    label="게시글 내용"
                    id="contents"
                  />
                </PostLayout>
              )}
              {layout === "right" && (
                <PostLayout layout={layout} postForm>
                  <Preview url={preview}>
                    {preview === null && <span>이미지 미리보기</span>}
                  </Preview>
                  <TextField
                    value={content}
                    multiline
                    rows={5}
                    fullWidth
                    onChange={changeContentsHandler}
                    label="게시글 내용"
                    id="contents"
                  />
                </PostLayout>
              )}
              {isEdit ? (
                <div
                  style={{ display: "flex", gap: "10px", marginBottom: "20px" }}
                >
                  <Button
                    onClick={deletePostHandler}
                    variant="contained"
                    size="large"
                    color="warning"
                  >
                    게시글 삭제
                  </Button>
                  <Button
                    onClick={updatePostHandler}
                    variant="contained"
                    size="large"
                  >
                    게시글 수정
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={addPostHandler}
                  sx={{ mb: 3 }}
                  variant="contained"
                  size="large"
                  disabled={preview === null || content.length === 0}
                >
                  게시글 작성
                </Button>
              )}
            </>
          )}
        </>
      )}
    </StyledForm>
  );
};

const Preview = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: lightgray;

  border: 1px dashed lightgray;
  width: 100%;
  min-height: 300px;
  max-height: 50vh;
  background-image: url(${({ url }) => url && url});
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto 100%;
`;

export default PostForm;
