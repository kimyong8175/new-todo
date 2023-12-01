import { styled } from "styled-components";
import {
  categoryListState,
  todoListState,
  selectedCategoryState,
} from "../recoil/atom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useState } from "react";
import { v4 } from "uuid";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const TodoItemContainer = styled.div`
  width: 60%;
  height: 50px;
  background-color: red;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-radius: 0.7rem;
  padding: 1rem;
  margin-bottom: 1rem;
  color: rgb(34, 34, 34);
  background: white;
  box-shadow: rgba(10, 10, 10, 0.1) 0px 0.2rem 0.5rem;
  transition: background-color 0.3s ease 0s, box-shadow 0.3s ease 0s;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 0.5rem;
`;

const CustomButton = styled.button`
  min-width: 50px;
  height: 30px;
  border: none;
  border-radius: 10px;
`;

const RemoveButton = styled(CustomButton)`
  background-color: #d27887;
  color: #f3eded;
`;

const Input = styled.input`
  margin-bottom: 20px;
  padding: 0px;
  width: 445px;
  height: 60px;
  border-radius: 15px;
  border: none;
  padding: 5px;
`;

const TodoBody = () => {
  const categoryList = useRecoilValue(categoryListState);
  const selectedCategory = useRecoilValue(selectedCategoryState);
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [inputTodo, setInputTodo] = useState("");
  const setTodoState = useSetRecoilState(todoListState);

  function handleClick(e: React.KeyboardEvent<HTMLElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (inputTodo.length < 1) return;

      let uniqueID = v4();
      setTodoState((oldTodo) => [
        ...oldTodo,
        { id: uniqueID, text: inputTodo, category: selectedCategory },
      ]);
      setInputTodo("");
    } else return;
  }

  return (
    <Wrapper>
      <Input
        type="text"
        value={inputTodo}
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          setInputTodo(e.currentTarget.value)
        }
        onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => handleClick(e)}
        placeholder="Add To Do..."
      />

      {todoList.map((todo) => (
        <>
          <TodoItemContainer key={todo.id}>
            <div>
              <span>{todo.text}</span>
            </div>
            <ButtonContainer>
              {categoryList.map((category) => (
                <CustomButton
                  key={category}
                  disabled={todo.category === category}
                  onClick={() =>
                    setTodoList((oldToDos) => {
                      const targetIdx = oldToDos.findIndex(
                        (targetTodo) => targetTodo.id === todo.id
                      );
                      const newToDo = {
                        id: todo.id,
                        text: todo.text,
                        category: category,
                      };

                      return [
                        ...oldToDos.slice(0, targetIdx),
                        newToDo,
                        ...oldToDos.slice(targetIdx + 1),
                      ];
                    })
                  }
                >
                  {category}
                </CustomButton>
              ))}
              <RemoveButton
                onClick={() =>
                  setTodoList((oldToDos) => {
                    const targetIdx = oldToDos.findIndex(
                      (targetTodo) => targetTodo.id === todo.id
                    );

                    return [
                      ...oldToDos.slice(0, targetIdx),
                      ...oldToDos.slice(targetIdx + 1),
                    ];
                  })
                }
              >
                Remove
              </RemoveButton>
            </ButtonContainer>
          </TodoItemContainer>
        </>
      ))}
    </Wrapper>
  );
};

export default TodoBody;
