import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";

import { getCookie } from "./shared/cookie";
import Header from "./components/layout/Header";
import { loginCheckAxios } from "./store/thunk-actions/userActions";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = getCookie("token");

  useEffect(() => {
    if (token) {
      dispatch(
        loginCheckAxios(token, (url, opt) => {
          navigate(url, opt);
        })
      );
    }
  }, [dispatch, navigate, token]);

  return (
    <Container maxWidth="sm">
      <Header />
      <Outlet />
    </Container>
  );
}

export default App;
