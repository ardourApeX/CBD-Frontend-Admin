import * as actionTypes from "../actions/actions";
const initialState = {
  seo: [],
  seoFirstLoad: true,
};

const get = (state, action) => {
  console.log("In get reducer", action);
  return {
    seo: action.data,
    seoFirstLoad: false,
  };
};
const update = (state, action) => {
  // let curValue=state[action.section];
  // curValue=action.data;
  let currentData = [...state.seo];
  currentData[action.section] = action.data;
  return {
    ...state,
    seo: currentData,
  };
};

const deletee = (state, action) => {
  console.log(action.section);
  let currentData = [...state.seo];
  currentData.splice(action.section, 1);
  return {
    ...state,
    seo: currentData,
  };
};

const add = (state, action) => {
  console.log(action.data);
  return {
    ...state,
    seo: [...state.seo, action.data],
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SEO:
      return get(state, action);
    case actionTypes.UPDATE_SEO:
      return update(state, action);
    case actionTypes.ADD_SEO:
      return add(state, action);
    case actionTypes.DELETE_SEO:
      return deletee(state, action);
    default:
      return state;
  }
};

export default reducer;
