import { styled } from "styled-components";
import { categoryListState, todoListState } from "../recoil/atom";
import { useRecoilState, useRecoilValue } from "recoil";

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

const TodoBody = () => {
  const categoryList = useRecoilValue(categoryListState);
  const [todoList, setTodoList] = useRecoilState(todoListState);

  return (
    <Wrapper>
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
