import Axios from "../../utilities/Axios/Axios";
import * as actionTypes from "./actions";
import { ERROR_MESSAGE } from "./constant";
import { BACK_END_URL } from "../../utilities/Axios/url";

export const get = () => {
  return (dispatch) => {
    return Axios.get(`${BACK_END_URL}/categories/getCategories`)
      .then((result) => {
        dispatch({
          type: actionTypes.GET_PRODUCT_CATEGORY,
          data: result.data.categories,
        });
        return `Categories Fetched Successfully`;
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};

export const add = (data) => {
  return (dispatch) => {
    return Axios.post(`${BACK_END_URL}/categories/add`, {
      ...data,
      categoryslug: data.categorytitle.replace(/\s+/g, `-`).toLowerCase(),
    })
      .then((result) => {
        dispatch({
          type: actionTypes.ADD_PRODUCT_CATEGORY,
          data: result.data.category,
        });
        return `Category Added Successfully`;
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};

export const edit = (data, id) => {
  return (dispatch) => {
    return Axios.post(`${BACK_END_URL}/categories/edit/${id}`, {
      ...data,
      categoryslug: data.categorytitle.replace(/\s+/g, `-`).toLowerCase(),
    })
      .then((result) => {
        console.log(result);
        dispatch({
          type: actionTypes.UPDATE_PRODUCT_CATEGORY,
          data: result.data.category,
        });
        return `Category Edited Successfully`;
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};

export const deletee = (id) => {
  return (dispatch) => {
    return Axios.delete(`${BACK_END_URL}/categories/${id}`)
      .then((result) => {
        dispatch({
          type: actionTypes.DELETE_PRODUCT_CATEGORY,
          data: id,
        });
        return `Category Deleted Successfully`;
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};
