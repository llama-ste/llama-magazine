import { useRef } from "react";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

import { postActions } from "../store/slices/postSlice";

const ImageUpload = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef();

  const selectFileHandler = () => {
    const reader = new FileReader();
    const file = fileInputRef.current.files[0];

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      dispatch(postActions.setPreview(reader.result));
    };
  };

  return (
    <Button
      sx={{ fontWeight: 900 }}
      variant="contained"
      component="label"
      endIcon={<PhotoCamera />}
    >
      Upload Image
      <input
        accept="image/*"
        type="file"
        onChange={selectFileHandler}
        ref={fileInputRef}
        hidden
      />
    </Button>
  );
};

export default ImageUpload;
