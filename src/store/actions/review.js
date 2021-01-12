import Axios from "../../utilities/Axios/Axios";
import * as actionTypes from "./actions";
import { ERROR_MESSAGE } from "./constant";
import { BACK_END_URL } from "../../utilities/Axios/url";

export const getReviews = () => {
  return (dispatch) => {
    return Axios.get(`${BACK_END_URL}/review/getReviews`)
      .then((result) => {
        console.log(result);
        dispatch({
          type: actionTypes.GET_REVIEWS,
          data: result.data.reviews,
        });
        return `Reviews Fetched Successfully`;
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};

export const editReview = (id) => {
  return (dispatch) => {
    return Axios.get(`${BACK_END_URL}/review/approve/${id}/${true}`)
      .then((result) => {
        console.log(result);
        dispatch({
          type: actionTypes.UPDATE_REVIEW,
          data: result.data.review,
        });
        return `Review Edited Successfully`;
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};

export const deleteReview = (id) => {
  return (dispatch) => {
    return Axios.get(`${BACK_END_URL}/review/delete/${id}`)
      .then((result) => {
        dispatch({
          type: actionTypes.DELETE_REVIEW,
          data: id,
        });
        return `Review Deleted Successfully`;
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};
