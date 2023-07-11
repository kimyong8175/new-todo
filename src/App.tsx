import { useRecoilState } from "recoil";
import { todoCategories, todoListState } from "./recoil/atom";
import React, { useState } from "react";

let id = 0;
function getId(): Number {
  return id++;
}

function App() {
  const [todos, setTodos] = useRecoilState(todoListState);
  const [categories, setCategories] = useRecoilState(todoCategories);
  const [inputTodo, setinputTodo] = useState("");
  const [inputCategory, setinputCategory] = useState("");

  function handleTodoClick() {
    setTodos((oldTodos) => [...oldTodos, { id: getId(), text: inputTodo }]);
  }

  function handleCategoryClick() {
    setCategories((oldCategories) => [...oldCategories, inputCategory]);
  }

  return (
    <>
      <div>
        {todos.map((todo) => (
          <p>{todo.text}</p>
        ))}
      </div>
      <div>
        <input
          type="text"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setinputTodo(event.currentTarget.value)
          }
        />
        <button onClick={handleTodoClick}>Add Todo</button>
      </div>
      <div>
        {categories.map((category) => (
          <p>{category}</p>
        ))}
      </div>
      <div>
        <input
          type="text"
          onChange={(e) => setinputCategory(e.currentTarget.value)}
        />
        <button onClick={handleCategoryClick}>Add Category</button>
      </div>
    </>
  );
}

export default App;
