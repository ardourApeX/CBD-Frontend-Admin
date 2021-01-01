import * as actionTypes from "../actions/actions";
const initialState = {
  data: [],
};

const get = (state, action) => {
  console.log("In get reducer", action);
  return {
    data: action.data,
  };
};
const update = (state, action) => {
  // let curValue=state[action.section];
  // curValue=action.data;
  let currentData = [...state.data];
  currentData[action.section] = action.data;
  return {
    ...state,
    data: currentData,
  };
};

const deletee = (state, action) => {
  let currentData = state.data;
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
    data: [...state.data, action.data],
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CATEGORY:
      return get(state, action);
    case actionTypes.UPDATE_CATEGORY:
      return update(state, action);
    case actionTypes.ADD_CATEGORY:
      return add(state, action);
    case actionTypes.DELETE_CATEGORY:
      return deletee(state, action);
    default:
      return state;
  }
};

export default reducer;
