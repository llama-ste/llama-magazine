import styled from "styled-components";

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  h2 {
    margin: 0px;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    max-width: 300px;
    width: 100%;
  }
`;

const StyledForm = ({ title, postForm, children, _onSubmit }) => {
  return (
    <FormWrapper
      onSubmit={(e) => {
        e.preventDefault();
        _onSubmit();
      }}
    >
      {title && (
        <>
          <h2>{title}</h2>
          <div className="input-group">{children}</div>
        </>
      )}
      {postForm && <>{children}</>}
    </FormWrapper>
  );
};

export default StyledForm;
