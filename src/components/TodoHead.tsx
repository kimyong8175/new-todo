import styled from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  categoryListState,
  selectedCategoryState,
  todoListState,
} from "../recoil/atom";
import CustomSelect from "./CustomSelect";
import { useState } from "react";
import { v4 } from "uuid";

const Wrapper = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 800;
  color: white;
`;

const Container = styled.div`
  margin: 0 auto;
  width: 70%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 30px;
`;

const InputContanier = styled.div`
  position: relative;
  width: 400px;
  height: 50px;
`;

const Input = styled.input`
  border: 1px solid red;
  margin: 0px;
  padding: 0px;
  width: 97%;
  /* outline: none; */
  height: 100%;
  border-radius: 15px;
  border: none;
  padding-left: 0.9rem;
`;

const Button = styled.button`
  position: absolute;
  top: 0;
  right: 0px;
  z-index: 2;
  border: none;
  outline: none;
  font-size: 18px;
  width: 60px;
  height: 100%;
  cursor: pointer;
  color: black;
  background-color: inherit;
  transform: translateX(2px);
  border-radius: 15px;
`;

const TodoHead = () => {
  const categories = useRecoilValue(categoryListState);
  const setTodoState = useSetRecoilState(todoListState);
  const selectedCategory = useRecoilValue(selectedCategoryState);
  const [inputTodo, setInputTodo] = useState("");

  function handleClick() {
    if (inputTodo.length < 1) return;

    let uniqueID = v4();
    setTodoState((oldTodo) => [
      ...oldTodo,
      { id: uniqueID, text: inputTodo, category: selectedCategory },
    ]);
    setInputTodo("");
  }

  return (
    <Wrapper>
      <TitleContainer>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            style={{ width: "30px", height: "30px" }}
          >
            <path d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
          </svg>
        </span>
        <h1>TO DOs</h1>
      </TitleContainer>
      <Container>
        <div style={{ marginLeft: "10px" }}>
          <CustomSelect categoryOptions={categories} />
        </div>
        <InputContanier>
          <Input
            type="text"
            value={inputTodo}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setInputTodo(e.currentTarget.value)
            }
          />
          <Button onClick={handleClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{ width: " 40px", height: "40px", color: "green" }}
            >
              <path d="M12 6v12m6-6H6" />
            </svg>
          </Button>
        </InputContanier>
      </Container>
    </Wrapper>
  );
};

export default TodoHead;
