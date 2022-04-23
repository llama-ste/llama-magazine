import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import StyledForm from "../components/layout/StyledForm";
import { getCookie } from "../shared/cookie";
import { idCheckAxios } from "../store/thunk-actions/userActions";
import { signupAxios } from "../store/thunk-actions/userActions";

const SignupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAvailable, isLoading } = useSelector((state) => state.user);
  const [isCheck, setIsCheck] = useState(false);
  const token = getCookie("token");

  if (token) {
    window.alert("이미 로그인이 되어있습니다.");
    navigate("/", { replace: true });
  }

  const { handleSubmit, control, getValues } = useForm();

  const submitHandler = ({ id, nickname, pwd, pwdConfirm }) => {
    if (!isAvailable && isCheck) {
      window.alert("ID를 확인을 해주세요.");
      return;
    }
    dispatch(
      signupAxios(id, nickname, pwd, pwdConfirm, (url, opt) =>
        navigate(url, opt)
      )
    );
  };

  const idCheckHandler = () => {
    const { id } = getValues();
    const reg =
      /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-z])*.([a-zA-Z])*/;

    if (!reg.test(id)) {
      window.alert("이메일 형식을 올바르게 입력해 주세요.");
      return;
    }

    dispatch(idCheckAxios(id));
    setIsCheck(true);
  };

  return (
    <StyledForm title={"회원가입"} _onSubmit={handleSubmit(submitHandler)}>
      <div style={{ display: "flex", width: "100%", gap: "5px" }}>
        <Controller
          name="id"
          control={control}
          defaultValue=""
          rules={{
            required: "아이디는 필수입니다!",
            pattern: {
              value:
                /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-z])*.([a-zA-Z])*/,
              message: "올바르지 않은 형식의 이메일입니다!",
            },
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              fullWidth
              label="Email"
              value={value}
              placeholder="이메일"
              onChange={onChange}
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
        />
        <Button
          sx={{ fontWeight: 900, width: "30%" }}
          variant="contained"
          size="small"
          onClick={() => idCheckHandler()}
        >
          중복 확인
        </Button>
      </div>
      {!isLoading && !isAvailable && isCheck && (
        <b
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "red",
          }}
        >
          ID가 중복되거나 잘못 입력 되었습니다.
          <CancelIcon color="red" />
        </b>
      )}
      {!isLoading && isAvailable && isCheck && (
        <b
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "green",
          }}
        >
          ID를 사용하셔도 됩니다.
          <CheckCircleIcon color="success" />
        </b>
      )}
      <Controller
        name="nickname"
        control={control}
        defaultValue=""
        rules={{
          required: "닉네임은 필수입니다!",
          pattern: {
            value: /^[a-zA-Zㄱ-힣0-9-_.]{2,12}$/,
          },
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            fullWidth
            label="Nickname"
            value={value}
            placeholder="영문, 한글 2 ~ 12자"
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
      />

      <Controller
        name="pwd"
        control={control}
        defaultValue=""
        rules={{
          required: "비밀번호는 필수입니다!",
          pattern: {
            value:
              /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/,
            message: "올바르지 않은 형식의 비밀번호입니다!",
          },
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            fullWidth
            label="Password"
            value={value}
            type="password"
            placeholder="숫자, 영문, 특수기호를 포함 8 ~ 16자"
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
      />
      <Controller
        name="pwdConfirm"
        control={control}
        defaultValue=""
        rules={{
          required: "비밀번호는 필수입니다!",
          pattern: {
            value:
              /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/,
            message: "올바르지 않은 형식의 비밀번호입니다!",
          },
        }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            fullWidth
            label="Password confirmation"
            value={value}
            type="password"
            placeholder="숫자, 영문, 특수기호를 포함 8 ~ 16자"
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
      />
      <Button
        sx={{ fontWeight: 900 }}
        type="submit"
        variant="contained"
        size="large"
      >
        회원가입하기
      </Button>
    </StyledForm>
  );
};

export default SignupPage;
