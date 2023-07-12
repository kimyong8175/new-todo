import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "persist",
  storage: localStorage,
});

export interface ITodoList {
  id: string;
  text: string;
  category: string;
}

export const todoListState = atom<ITodoList[]>({
  key: "todoListState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const categoryListState = atom<string[]>({
  key: "CategoryList",
  default: ["todo", "doing", "done"],
});

export const selectedCategoryState = atom({
  key: "selectedCategory",
  default: "todo",
});

export const todoSelector = selector({
  key: "todoSelector",
  get: ({ get }) => {
    const todoList = get(todoListState);

    return todoList.length;
  },
});

export const filteredTodoList = selector({
  key: "filteredTodoList",
  get: ({ get }) => {
    const selected = get(selectedCategoryState);
    const todoList = get(todoListState);

    const filteredTodos = todoList.filter((todo) => {
      return todo.category === selected;
    });

    return filteredTodos;
  },
});
