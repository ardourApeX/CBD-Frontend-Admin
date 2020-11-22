import * as actionTypes from "../actions/actions";
// const initialState = {
//   logo: {
//     images: [
//       {
//         src: "",
//         name: "",
//       },
//       {
//         src: "",
//         name: "",
//       },
//       {
//         src: "",
//         name: "",
//       },
//     ],
//   },
//   banner: {
//     title: "",
//     content: "",
//     btnText: "",
//     hide: false,
//     images: [
//       {
//         src: "",
//         name: "",
//       },
//       {
//         src: "",
//         name: "",
//       },
//     ],
//   },
//   categorySlider: {
//     title: "",
//     btnText: "",
//     hide: false,
//     images: [],
//   },
//   secondSection: {
//     title: "",
//     bigTitle: "",
//     hide: false,
//     images: [],
//   },
//   thirdSection: {
//     bigTitle: "",
//     title: "",
//     content: "",
//     btnText: "",
//     hide: false,
//     images: [
//       {
//         src: "",
//         name: "",
//       },
//     ],
//   },
//   fourthSection: {
//     title: "",
//     content: "",
//     hide: false,
//     images: [],
//   },
// };

const initialState = {};

const get = (action) => {
  console.log("In get reducer", action);
  return {
    ...action.data,
  };
};
const update = (state, action) => {
  // let curValue=state[action.section];
  // curValue=action.data;
  return {
    ...state,
    [action.section]: action.data,
  };
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_HOME:
      return get(action);
    case actionTypes.UPDATE_HOME:
      return update(state, action);
    default:
      return state;
  }
};

export default reducer;
