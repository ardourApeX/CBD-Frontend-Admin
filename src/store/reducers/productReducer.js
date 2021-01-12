import * as actionTypes from "../actions/actions";
const initialState = {
  products: [],
  attributes: [],
  combos: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ATTRIBUTES:
      return {
        ...state,
        attributes: action.data,
      };
    case actionTypes.UPDATE_ATTRIBUTE:
      return {
        ...state,
        attributes: state.attributes.map((item) => {
          if (item._id === action.data._id) {
            return action.data;
          }
          return item;
        }),
      };
    case actionTypes.ADD_ATTRIBUTE:
      return {
        ...state,
        attributes: [...state.attributes, action.data],
      };
    case actionTypes.DELETE_ATTRIBUTE:
      return {
        ...state,
        attributes: state.attributes.filter((item) => item._id !== action.data),
      };
    case actionTypes.GET_PRODUCTS:
      return {
        ...state,
        products: action.data,
      };
    case actionTypes.ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.data],
      };
    case actionTypes.DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((item) => item._id !== action.data),
      };
    case actionTypes.UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((item) => {
          if (item._id === action.data._id) {
            return action.data;
          }
          return item;
        }),
      };
    case actionTypes.GET_COMBOS:
      return {
        ...state,
        combos: action.data,
      };
    case actionTypes.ADD_COMBO:
      return {
        ...state,
        combos: [...state.products, action.data],
      };
    case actionTypes.UPDATE_COMBO:
      return {
        ...state,
        combos: state.combos.map((item) => {
          if (item._id === action.data._id) {
            return action.data;
          }
          return item;
        }),
      };
    case actionTypes.DELETE_COMBO:
      return {
        ...state,
        combos: state.combos.filter((item) => item._id !== action.data),
      };
    default:
      return state;
  }
};

export default reducer;
