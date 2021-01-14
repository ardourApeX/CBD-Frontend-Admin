import Axios from "../../utilities/Axios/Axios";
import { ERROR_MESSAGE } from "./constant";
import { BACK_END_URL } from "../../utilities/Axios/url";
import * as actionTypes from "./actions";

export const getStatistics = () => {
  return (dispatch) => {
    return Axios.get(`${BACK_END_URL}/ambassador-portal/getStatistics`)
      .then((result) => {
        console.log(result);
        const {
          visits,
          productsSold,
          kitsSold,
          orders,
          count1,
          count2,
        } = result.data;
        return {
          message: `Statistics Fetched Successfully`,
          visits,
          productsSold,
          kitsSold,
          orders,
          count1,
          count2,
        };
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};

export const getAmbassadors = () => {
  return (dispatch) => {
    return Axios.get(`${BACK_END_URL}/ambassador-portal/getAmbassadors`)
      .then((result) => {
        dispatch({
          type: actionTypes.GET_AMBASSADORS,
          data: result.data.user,
        });
        return `Ambassadors Fetched Successfully`;
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};

export const getAmbassadorDetails = (id) => {
  return (dispatch) => {
    return Axios.get(`${BACK_END_URL}/ambassador-portal/viewAmbassador/${id}`)
      .then((result) => {
        return {
          message: `Ambassadors Details Fetched Successfully`,
          data: result.data.user,
        };
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};

export const addAmbassador = (data) => {
  return (dispatch) => {
    return Axios.post(`${BACK_END_URL}/ambassador-portal/register/admin`, data)
      .then((result) => {
        dispatch({
          type: actionTypes.ADD_AMBASSADOR,
          data: result.data.data,
        });
        return `Ambassador Added Successfully`;
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};

export const editAmbassador = (id) => {
  return (dispatch) => {
    return Axios.get(
      `${BACK_END_URL}/ambassador-portal/approveAmbassador/${id}`
    )
      .then((result) => {
        console.log(result);
        dispatch({
          type: actionTypes.UPDATE_AMBASSADOR,
          data: result.data.data,
        });
        return `Ambassador Approved Successfully`;
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};

export const deleteAmbassador = (id) => {
  return (dispatch) => {
    return Axios.delete(`${BACK_END_URL}/ambassador-portal/delete/${id}`)
      .then((result) => {
        dispatch({
          type: actionTypes.DELETE_AMBASSADOR,
          data: id,
        });
        return `Ambassador Deleted Successfully`;
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};
