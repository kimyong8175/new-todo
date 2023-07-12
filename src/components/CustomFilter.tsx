// import React from "react";
// import { styled } from "styled-components";

// import { categoryListState, filteredTodoList } from "../recoil/atom";
// import { useRecoilValue } from "recoil";

// const Wrapper = styled.div`
//   width: 80%;
//   display: flex;
//   justify-content: end;
//   align-items: center;
// `;

// const CustomFilter = () => {
//   const categoryList = useRecoilValue(categoryListState);

//   return (
//     <Wrapper>
//       <p>Filter</p>
//       <select>
//         <option value="all">All</option>
//         {categoryList.map((category) => (
//           <option value={category}>{category}</option>
//         ))}
//       </select>
//     </Wrapper>
//   );
// };

// export default CustomFilter;
