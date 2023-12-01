import { useState } from "react";
import CreatableSelect from "react-select/creatable";
import { components } from "react-select";
import { selectedCategoryState, categoryListState } from "../recoil/atom";
import { useRecoilState, useSetRecoilState } from "recoil";

const styles = {
  control: (styles: any) => ({
    ...styles,
    borderRadius: "15px",
    height: "50px",
    width: "455px",
  }),
};

interface IOption {
  label: string;
  value: string;
}

const createOption = (label: string) => ({
  label,
  value: label.toLowerCase(),
});

const CustomSelect = () => {
  const Option = (props: any) => {
    return (
      <>
        <components.Option {...props}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div>{props.children}</div>
            <div>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Delete clicked: ", props.children);
                  handleDelete(props.children);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  width={12}
                  height={12}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </span>
            </div>
          </div>
        </components.Option>
      </>
    );
  };

  const setSelectedCategory = useSetRecoilState(selectedCategoryState);
  const [categoryList, setCategoryList] = useRecoilState(categoryListState);
  const newCategoryOptions = categoryList.map((category) =>
    createOption(category)
  );

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState(newCategoryOptions);
  const [value, setValue] = useState<IOption | null>();

  const handleCreate = (inputValue: string) => {
    setIsLoading(true);
    setTimeout(() => {
      const newOption = createOption(inputValue);
      setIsLoading(false);
      setOptions((prev) => [...prev, newOption]);
      setCategoryList((old) => [...old, newOption.label]);
    }, 1000);
  };

  const handleDelete = (name: string) => {
    const idxFromOptions = options.findIndex((option) => option.label === name);
    const idxFromCategory = categoryList.findIndex(
      (category) => category === name
    );
    setOptions([
      ...options.slice(0, idxFromOptions),
      ...options.slice(idxFromOptions + 1, options.length),
    ]);
    setCategoryList([
      ...categoryList.slice(0, idxFromCategory),
      ...categoryList.slice(idxFromCategory + 1, categoryList.length),
    ]);
  };

  return (
    <CreatableSelect
      styles={styles}
      isClearable
      isDisabled={isLoading}
      isLoading={isLoading}
      onChange={(newValue) => {
        setValue(newValue);

        if (newValue !== null) {
          setSelectedCategory(newValue?.label as string);
        }

        if (newValue === null) {
          setSelectedCategory("todo");
        }
      }}
      onCreateOption={handleCreate}
      options={options}
      value={value}
      backspaceRemovesValue
      components={{ Option }}
      placeholder="Category..."
    />
  );
};

export default CustomSelect;
