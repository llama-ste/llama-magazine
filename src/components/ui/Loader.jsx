import styled from "styled-components";
import { CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <LoaderLayout>
      <CircularProgress />
      <b>Loading...</b>
    </LoaderLayout>
  );
};

const LoaderLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 30vh;
  gap: 20px;
`;

export default Loader;
