import Axios from "../../utilities/Axios/Axios";
import * as actionTypes from "./actions";
import { ERROR_MESSAGE } from "./constant";
import { BACK_END_URL } from "../../utilities/Axios/url";

export const getCoupons = () => {
  return (dispatch) => {
    return Axios.get(`${BACK_END_URL}/stripe/coupon/list`)
      .then((result) => {
        dispatch({
          type: actionTypes.GET_COUPONS,
          data: result.data.coupon.data,
        });
        return `Coupons Fetched Successfully`;
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};

export const addCoupon = (data) => {
  return (dispatch) => {
    return Axios.post(`${BACK_END_URL}/stripe/coupon/generate`, data)
      .then((result) => {
        console.log(result);
        dispatch({
          type: actionTypes.ADD_COUPON,
          data: result.data.coupon,
        });
        return `Coupon Added Successfully`;
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};

export const deleteCoupon = (id) => {
  return (dispatch) => {
    return Axios.get(`${BACK_END_URL}/stripe/admin/coupon/list/${id}`)
      .then((result) => {
        dispatch({
          type: actionTypes.DELETE_COUPON,
          data: id,
        });
        return `Coupon Deleted Successfully`;
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};
