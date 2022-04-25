import { userActions } from "../slices/userSlice";
import { instance } from "../../services/axios";
import { postActions } from "../slices/postSlice";

export const signupAxios = (
  email,
  nickname,
  password,
  password_confirmation,
  navigate
) => {
  return async function (dispatch) {
    let user = {
      email,
      nickname,
      password,
      password_confirmation,
    };
    try {
      const response = await instance.post("/auth/sign_up", user);

      user = { email, nickname, uid: response.data.id };

      dispatch(userActions.signup({ user, token: response.data.token }));
      dispatch(postActions.resetPost());
      navigate("/", { replace: true });
    } catch (err) {
      console.log("회원가입 실패 : ", err.response);
    }
  };
};

export const loginAxios = (email, password, navigate) => {
  return async function (dispatch) {
    let user = {
      email,
      password,
    };

    try {
      const response = await instance.post("/auth/sign_in", user);

      user = {
        email,
        nickname: response.data.nickname,
        uid: response.data.id,
      };

      navigate("/", { replace: true });
      dispatch(userActions.login({ user, token: response.data.token }));
      dispatch(postActions.resetPost());
    } catch (err) {
      if (err.response.data.error_code === 40103) {
        window.alert("비밀번호가 유효하지 않습니다.");
      }
      if (err.response.data.error_code === 40101) {
        window.alert("유효하지 않은 아이디 입니다.");
      }

      console.log("로그인 실패 : ", err.response);
    }
  };
};

export const idCheckAxios = (id) => {
  return async function (dispatch) {
    dispatch(userActions.loading(true));

    try {
      const response = await instance.get(`/auth/emails/${id}/available`);

      dispatch(userActions.idCheck({ isAvailable: response.data.available }));
    } catch (err) {
      console.log(err.response);
    }
  };
};

export const logoutAxios = (token, navigate) => {
  return async function (dispatch) {
    try {
      await instance.post(
        "/auth/sign_out",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(userActions.logout());
      dispatch(postActions.resetPost());
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err.response);
    }
  };
};

export const loginCheckAxios = (token, navigate) => {
  return async function (dispatch) {
    try {
      const response = await instance.get("/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = {
        email: response.data.email,
        nickname: response.data.nickname,
        uid: response.data.id,
      };

      dispatch(userActions.loginCheck({ user, isValid: true }));
    } catch (err) {
      dispatch(userActions.loginCheck({ user: null, isValid: false }));
      window.alert("로그인이 만료 되었습니다.");
      navigate("/signin", { replace: true });
      console.log("로그인 체크 실패 :", err.response);
    }
  };
};
