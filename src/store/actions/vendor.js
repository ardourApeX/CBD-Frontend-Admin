import Axios from "../../utilities/Axios/Axios";
import * as actionTypes from "./actions";
import { ERROR_MESSAGE } from "./constant";
import { BACK_END_URL } from "../../utilities/Axios/url";

export const get = () => {
  return (dispatch) => {
    return Axios.get(`${BACK_END_URL}/vendor/getAll`)
      .then((result) => {
        dispatch({
          type: actionTypes.GET_VENDOR,
          data: result.data.vendor,
        });
        return `Vendors Fetched Successfully`;
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};

export const add = (data) => {
  return (dispatch) => {
    return Axios.post(`${BACK_END_URL}/vendor/addVendor`, data)
      .then((result) => {
        dispatch({
          type: actionTypes.ADD_VENDOR,
          data: result.data.vendor,
        });
        return `Vendor Added Successfully`;
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};

export const edit = (data, id) => {
  return (dispatch) => {
    return Axios.post(`${BACK_END_URL}/vendor/editVendor/${id}`, data)
      .then((result) => {
        console.log(result);
        dispatch({
          type: actionTypes.UPDATE_VENDOR,
          data: result.data.vendor,
        });
        return `Vendor Edited Successfully`;
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};

export const deletee = (id) => {
  return (dispatch) => {
    return Axios.delete(`${BACK_END_URL}/vendor/${id}`)
      .then((result) => {
        dispatch({
          type: actionTypes.DELETE_VENDOR,
          data: id,
        });
        return `Vendor Deleted Successfully`;
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};
