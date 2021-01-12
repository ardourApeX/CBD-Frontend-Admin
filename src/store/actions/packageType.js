import Axios from "../../utilities/Axios/Axios";
import * as actionTypes from "./actions";
import { ERROR_MESSAGE } from "./constant";
import { BACK_END_URL } from "../../utilities/Axios/url";

export const get = () => {
  return (dispatch) => {
    return Axios.get(`${BACK_END_URL}/packagetype/getAll`)
      .then((result) => {
        dispatch({
          type: actionTypes.GET_PACKAGE_TYPE,
          data: result.data.package,
        });
        return `Package Types Fetched Successfully`;
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};

export const add = (data) => {
  return (dispatch) => {
    return Axios.post(`${BACK_END_URL}/packagetype/addPackageType`, data)
      .then((result) => {
        dispatch({
          type: actionTypes.ADD_PACKAGE_TYPE,
          data: result.data.package,
        });
        return `Package Type Added Successfully`;
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};

export const edit = (data, id) => {
  return (dispatch) => {
    return Axios.post(`${BACK_END_URL}/packagetype/editPackageType/${id}`, data)
      .then((result) => {
        console.log(result);
        dispatch({
          type: actionTypes.UPDATE_PACKAGE_TYPE,
          data: result.data.package,
        });
        return `Package Type Edited Successfully`;
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};

export const deletee = (id) => {
  return (dispatch) => {
    return Axios.delete(`${BACK_END_URL}/packagetype/deletePackageType/${id}`)
      .then((result) => {
        dispatch({
          type: actionTypes.DELETE_PACKAGE_TYPE,
          data: id,
        });
        return `Package Type Deleted Successfully`;
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};
