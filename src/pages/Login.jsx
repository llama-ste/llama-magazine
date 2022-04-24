import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import StyledForm from "../components/layout/StyledForm";
import { getCookie } from "../shared/cookie";
import { loginAxios } from "../store/thunk-actions/userActions";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = getCookie("token");
  const isLogin = useSelector((state) => state.user.isLogin);

  if (token && isLogin) {
    window.alert("이미 로그인이 되어있습니다.");
    navigate("/", { replace: true });
  }

  const {
    handleSubmit,
    control,
    formState: { dirtyFields },
  } = useForm({
    mode: "onChange",
  });

  const submitHandler = ({ id, pwd }) => {
    dispatch(loginAxios(id, pwd, (url, opt) => navigate(url, opt)));
  };

  return (
    <StyledForm title={"로그인"} _onSubmit={handleSubmit(submitHandler)}>
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
            placeholder="이메일"
            label="Email"
            value={value}
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
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
      />
      <Button
        sx={{ fontWeight: 900 }}
        variant="contained"
        size="large"
        type="submit"
        disabled={!(dirtyFields?.id && dirtyFields?.pwd)}
      >
        로그인하기
      </Button>
    </StyledForm>
  );
};

export default LoginPage;
