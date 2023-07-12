import { useSetRecoilState } from "recoil";
import { categoryListState } from "../recoil/atom";
import { useState } from "react";

const CategoryCreator = () => {
  const setCategories = useSetRecoilState(categoryListState);
  const [inputCategories, setInputCategories] = useState("");

  function handleClick() {
    setCategories((oldCategories) => [...oldCategories, inputCategories]);
    setInputCategories("");
  }

  return (
    <>
      <input
        type="text"
        value={inputCategories}
        onChange={(e) => setInputCategories(e.currentTarget.value)}
      />
      <button onClick={handleClick}>Add Category</button>
    </>
  );
};

export default CategoryCreator;
