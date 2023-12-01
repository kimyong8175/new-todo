// import { useRecoilState, useRecoilValue } from "recoil";
// import { todoListState, selectedCategoryState } from "../recoil/atom";
// import React, { useState } from "react";

// const TodoCreator = () => {
//   const [todoState, setTodoState] = useRecoilState(todoListState);
//   const selectedCategory = useRecoilValue(selectedCategoryState);
//   const [inputTodo, setInputTodo] = useState("");

//   function handleClick() {
//     setTodoState((oldTodo) => [
//       ...oldTodo,
//       { id: 1, text: inputTodo, category: selectedCategory },
//     ]);
//     setInputTodo("");
//   }

//   return (
//     <div>
//       <div>
//         <input
//           type="text"
//           value={inputTodo}
//           placeholder="Write a todo title..."
//           onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//             setInputTodo(e.currentTarget.value)
//           }
//         />
//       </div>
//       <button onClick={handleClick}>Add</button>
//     </div>
//   );
// };

// export default TodoCreator;
