import styled from "styled-components";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <h1>존재하지 않는 페이지 입니다.</h1>
      <Button
        sx={{ fontWeight: 900 }}
        size="large"
        variant="contained"
        onClick={() => navigate("/", { replace: true })}
      >
        홈페이지로 가기
      </Button>
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60vh;
  gap: 20px;
`;

export default NotFoundPage;
