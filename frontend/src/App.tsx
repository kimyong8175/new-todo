import TodoHead from "./components/TodoHead";
import TodoListPage from "./pages/TodoListPage";
import TodoBody from "./components/TodoBody";

const App = () => {
  return (
    <>
      <TodoListPage>
        <TodoHead />
        <hr />
        <TodoBody />
      </TodoListPage>
    </>
  );
};

export default App;
