import * as actionTypes from "../actions/actions";
const initialState = {
  data: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_COUPONS:
      return {
        ...state,
        data: action.data,
      };
    case actionTypes.ADD_COUPON:
      return {
        ...state,
        data: [...state.data, action.data],
      };
    case actionTypes.DELETE_COUPON:
      return {
        ...state,
        data: state.data.filter((item) => item.id !== action.data),
      };
    default:
      return state;
  }
};

export default reducer;
