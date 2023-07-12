import { ReactNode } from "react";
import { styled } from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  border-radius: 20px;
  width: 800px;
  height: 700px;
  background-color: #252323;
`;

interface props {
  children: ReactNode;
}

const TodoListPage = ({ children }: props) => {
  return (
    <Container>
      <Wrapper>{children}</Wrapper>
    </Container>
  );
};

export default TodoListPage;
