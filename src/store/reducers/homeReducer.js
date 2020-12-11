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

const initialState = {
  homeData: {},
  homeFirstLoad: true,
};

const get = (state, action) => {
  return {
    ...state,
    homeData: action.data,
    homeFirstLoad: false,
  };
};
const update = (state, action) => {
  return {
    ...state,
    homeData: {
      ...state.homeData,
      [action.section]: action.data[action.section],
    },
  };
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_HOME:
      return get(state, action);
    case actionTypes.UPDATE_HOME:
      return update(state, action);
    default:
      return state;
  }
};

export default reducer;
