import styled from "styled-components";
import { Button, Avatar, Paper, TextField } from "@mui/material";
import { red } from "@mui/material/colors";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import {
  updateCommentAxios,
  deleteCommentAxios,
} from "../../store/thunk-actions/commentActions";

const BtnArea = {
  minWidth: "50px",
  minHeight: "30px",
};

const Comment = (props) => {
  const dispatch = useDispatch();
  const { user, content, id: commentId, token, postId } = props;
  const { user: currentUser } = useSelector((state) => state.user);
  const [isEdit, setIsEdit] = useState(false);
  const [updateComment, setUpdateComment] = useState(content);

  const isSame = user?.id === currentUser?.uid;

  const updateCommentHandler = () => {
    dispatch(updateCommentAxios(postId, commentId, updateComment, token));
    setIsEdit(false);
  };

  const deleteCommentHandler = () => {
    dispatch(deleteCommentAxios(postId, commentId, token));
  };

  return (
    <Paper
      sx={{
        mb: 2,
        p: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      elevation={2}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginRight: 10,
        }}
      >
        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          {user.nickname[0].toUpperCase()}
        </Avatar>
        <b style={{ minWidth: "max-content" }}>{user.nickname}</b>
        {isEdit ? (
          <TextField
            multiline
            value={updateComment}
            onChange={(e) => setUpdateComment(e.target.value)}
          />
        ) : (
          <span style={{ wordBreak: "break-all" }}>{content}</span>
        )}
      </div>
      {isEdit ? (
        <BtnWrapper>
          {isSame && (
            <Button
              style={BtnArea}
              onClick={() => setIsEdit(false)}
              variant="outlined"
              color="inherit"
              size="small"
            >
              <b>취소</b>
            </Button>
          )}
          {isSame && (
            <Button
              style={BtnArea}
              onClick={updateCommentHandler}
              variant="outlined"
              sx={{ ml: 1 }}
              size="small"
            >
              <b>완료</b>
            </Button>
          )}
        </BtnWrapper>
      ) : (
        <BtnWrapper>
          {isSame && (
            <Button
              style={BtnArea}
              onClick={deleteCommentHandler}
              variant="outlined"
              color="error"
              size="small"
            >
              <b>삭제</b>
            </Button>
          )}
          {isSame && (
            <Button
              style={BtnArea}
              onClick={() => setIsEdit(true)}
              variant="outlined"
              sx={{ ml: 1 }}
              size="small"
            >
              <b>수정</b>
            </Button>
          )}
        </BtnWrapper>
      )}
    </Paper>
  );
};

const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Comment;
