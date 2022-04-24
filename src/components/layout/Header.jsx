import styled from "styled-components";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getCookie, deleteCookie } from "../../shared/cookie";
import { logoutAxios } from "../../store/thunk-actions/userActions";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = getCookie("token");
  const isLogin = useSelector((state) => state.user.isLogin);

  const logoutHandler = () => {
    dispatch(
      logoutAxios(token, (url, opt) => {
        navigate(url, opt);
      })
    );
  };

  return (
    <StyledHeader>
      <h3 onClick={() => navigate("/")}>llama's magazine</h3>
      {token && isLogin ? (
        <div>
          <Button onClick={logoutHandler} sx={{ fontWeight: 900 }} size="large">
            로그아웃
          </Button>
        </div>
      ) : (
        <div>
          <Button
            onClick={() => navigate("/signup")}
            sx={{ fontWeight: 900 }}
            size="large"
          >
            회원가입
          </Button>
          <Button
            onClick={() => navigate("/signin")}
            sx={{ fontWeight: 900, ml: 1 }}
            size="large"
          >
            로그인
          </Button>
        </div>
      )}
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h3 {
    &:hover {
      cursor: pointer;
    }
  }
`;

export default Header;
