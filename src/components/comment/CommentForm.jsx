import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { addCommentAxios } from "../../store/thunk-actions/commentActions";

const StyledForm = styled.form`
  display: flex;
  margin-bottom: 16px;
`;

const CommentForm = ({ postId, token }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");

  const changeCommentHandler = (e) => {
    setComment(e.target.value);
  };

  const addCommentHandler = () => {
    dispatch(addCommentAxios(postId, comment, token));
    setComment("");
  };

  return (
    <StyledForm onSubmit={(e) => e.preventDefault()}>
      <TextField
        onChange={changeCommentHandler}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            addCommentHandler();
          }
        }}
        value={comment}
        fullWidth
        label="댓글"
        id="comment"
      />
      <Button onClick={addCommentHandler} variant="contained">
        <b>작성</b>
      </Button>
    </StyledForm>
  );
};

export default CommentForm;
