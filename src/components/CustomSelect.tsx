import { useState } from "react";
import CreatableSelect from "react-select/creatable";
import { selectedCategoryState, categoryListState } from "../recoil/atom";
import { useRecoilState, useSetRecoilState } from "recoil";

interface Option {
  label: string;
  value: string;
}

interface IProps {
  categoryOptions: string[];
}

const createOption = (label: string) => ({
  label,
  value: label.toLowerCase(),
});

const CustomSelect = ({ categoryOptions }: IProps) => {
  const setSelectedCategory = useSetRecoilState(selectedCategoryState);
  const [categoryList, setCategoryList] = useRecoilState(categoryListState);
  const newCategoryOptions = categoryOptions.map((category) =>
    createOption(category)
  );

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState(newCategoryOptions);
  const [value, setValue] = useState<Option | null>();

  const handleCreate = (inputValue: string) => {
    setIsLoading(true);
    setTimeout(() => {
      const newOption = createOption(inputValue);
      setIsLoading(false);
      setOptions((prev) => [...prev, newOption]);
      setValue(newOption);
      setCategoryList((old) => [...old, newOption.label]);
    }, 1000);
  };

  return (
    <CreatableSelect
      isClearable
      isDisabled={isLoading}
      isLoading={isLoading}
      onChange={(newValue) => {
        setValue(newValue);
        if (newValue) {
          setSelectedCategory(newValue?.label as string);
        }
      }}
      onCreateOption={handleCreate}
      options={options}
      value={value}
    />
  );
};

export default CustomSelect;
