import * as actionTypes from "../actions/actions";
const initialState = {
  ambassadors: [],
  creatives: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_AMBASSADORS:
      return {
        ...state,
        ambassadors: action.data,
      };
    case actionTypes.UPDATE_AMBASSADOR:
      return {
        ...state,
        ambassadors: state.ambassadors.map((item) => {
          if (item._id === action.data._id) {
            return action.data;
          }
          return item;
        }),
      };
    case actionTypes.ADD_AMBASSADOR:
      return {
        ...state,
        ambassadors: [...state.data, action.data],
      };
    case actionTypes.DELETE_AMBASSADOR:
      return {
        ...state,
        ambassadors: state.ambassadors.filter(
          (item) => item._id !== action.data
        ),
      };
    case actionTypes.GET_CREATIVES:
      return {
        ...state,
        creatives: action.data,
      };
    case actionTypes.ADD_CREATIVE:
      return {
        ...state,
        creatives: [...state.creatives, action.data],
      };
    case actionTypes.DELETE_CREATIVE:
      return {
        ...state,
        creatives: state.creatives.filter((item) => item._id !== action.data),
      };
    default:
      return state;
  }
};

export default reducer;
