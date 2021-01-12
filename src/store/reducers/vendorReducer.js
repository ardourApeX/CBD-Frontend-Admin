import * as actionTypes from "../actions/actions";
const initialState = {
  data: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_VENDOR:
      return {
        ...state,
        data: action.data,
      };
    case actionTypes.UPDATE_VENDOR:
      return {
        ...state,
        data: state.data.map((item) => {
          if (item._id === action.data._id) {
            return action.data;
          }
          return item;
        }),
      };
    case actionTypes.ADD_VENDOR:
      return {
        ...state,
        data: [...state.data, action.data],
      };
    case actionTypes.DELETE_VENDOR:
      return {
        ...state,
        data: state.data.filter((item) => item._id !== action.data),
      };
    default:
      return state;
  }
};

export default reducer;
