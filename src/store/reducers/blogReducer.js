import * as actionTypes from "../actions/actions";
const initialStore = {
  blogs: [],
  pageNo: 0,
  size: 10,
};

const update = (state, action) => {
  let curValue = [...state.blogs];
  curValue[action.index] = action.payload;
  return {
    ...state,
    blogs: curValue,
    pageNo: action.pageNo,
  };
};

const reducer = (state = initialStore, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_BLOG:
      return { ...state, blogs: action.payload, pageNo: action.pageNo };
    case actionTypes.UPDATE_BLOG:
      return update(state, action);
    case actionTypes.DELETE_BLOG:
      return {
        ...state,
        blogs: state.blogs.filter((blog) => blog._id !== action.id),
      };

    default:
      return state;
  }
};

export default reducer;
