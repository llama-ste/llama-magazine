import styled, { css } from "styled-components";

const LayoutWrapper = styled.div`
  width: 100%;

  ${({ layout }) =>
    layout === "left"
      ? css`
          display: flex;
          gap: ${({ postForm }) => (postForm ? "20px" : "")};
        `
      : layout === "right" &&
        css`
          display: flex;
          flex-direction: row-reverse;
          gap: ${({ postForm }) => (postForm ? "20px" : "")};
        `}
`;

const PostLayout = ({ children, layout, postForm }) => {
  return (
    <LayoutWrapper postForm={postForm} layout={layout}>
      {children}
    </LayoutWrapper>
  );
};

export default PostLayout;
