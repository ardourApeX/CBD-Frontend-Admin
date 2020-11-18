import * as actionTypes from "../actions/actions";
const initialState = {
  banners: [],
  bannerFirstLoad: true,
};

const get = (state, action) => {
  console.log("In get reducer", action);
  return {
    banners: action.data,
    bannerFirstLoad: false,
  };
};
const update = (state, action) => {
  // let curValue=state[action.section];
  // curValue=action.data;
  let currentData = state.banners;
  currentData[action.section] = action.data;
  return {
    ...state,
    banners: currentData,
  };
};

const deletee = (state, action) => {
  let currentData = state.banners;
  currentData.splice(action.section, 1);
  return {
    ...state,
    data: currentData,
  };
};

const add = (state, action) => {
  console.log(action.data);
  return {
    ...state,
    banners: [...state.banners, action.data],
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_BANNER:
      return get(state, action);
    case actionTypes.UPDATE_BANNER:
      return update(state, action);
    case actionTypes.ADD_BANNER:
      return add(state, action);
    case actionTypes.DELETE_CATEGORY:
      return deletee(state, action);
    default:
      return state;
  }
};

export default reducer;
