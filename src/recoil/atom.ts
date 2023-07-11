import { atom } from "recoil";

export interface ITodoList {
  id?: Number;
  text: string;
  // category: todoCate;
}

export const todoListState = atom<ITodoList[]>({
  key: "todoListState",
  default: [],
});

export const todoCategories = atom({
  key: "todoCategories",
  default: ["todo", "doing", "done"],
});
