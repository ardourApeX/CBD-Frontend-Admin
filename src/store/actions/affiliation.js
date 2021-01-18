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

export const getAmbassadorDetails = (id, type) => {
  return (dispatch) => {
    let url;
    if (type === "Ambassador") {
      url = `${BACK_END_URL}/ambassador-portal/viewAmbassador/${id}`;
    } else {
      url = `${BACK_END_URL}/ambassador-portal/referalView/${id}`;
    }
    return Axios.get(url)
      .then((result) => {
        console.log(result);
        return {
          message: `Details Fetched Successfully`,
          data: result.data.user,
        };
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};

export const getReferals = () => {
  return (dispatch) => {
    return Axios.get(`${BACK_END_URL}/ambassador-portal/getReferals`)
      .then((result) => {
        return {
          message: `Referrals Fetched Successfully`,
          data: result.data.data,
        };
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};

export const getCreatives = () => {
  return (dispatch) => {
    return Axios.get(`${BACK_END_URL}/ambassador-portal/getCreatives`)
      .then((result) => {
        dispatch({
          type: actionTypes.GET_CREATIVES,
          data: result.data.creatives,
        });
        return `Creatives Fetched Successfully`;
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

export const addCreative = (data) => {
  return (dispatch) => {
    return Axios.post(
      `${BACK_END_URL}/ambassador-portal/creatives/add-creative`,
      data
    )
      .then((result) => {
        dispatch({
          type: actionTypes.ADD_CREATIVE,
          data: result.data.creative,
        });
        return `Creative Added Successfully`;
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

export const disapproveAmbassador = (id) => {
  return (dispatch) => {
    return Axios.get(
      `${BACK_END_URL}/ambassador-portal/disapproveAmbassador/${id}`
    )
      .then((result) => {
        console.log(result);
        dispatch({
          type: actionTypes.UPDATE_AMBASSADOR,
          data: result.data.data,
        });
        return `Ambassador Disapproved Successfully`;
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

export const deleteCreative = (id) => {
  return (dispatch) => {
    return Axios.get(`${BACK_END_URL}/ambassador-portal/creatives/delete/${id}`)
      .then((result) => {
        dispatch({
          type: actionTypes.DELETE_CREATIVE,
          data: id,
        });
        return `Creative Deleted Successfully`;
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};

export const makePayment = (id, _id) => {
  return (dispatch) => {
    return Axios.get(
      `${BACK_END_URL}/ambassador-portal/makePayment/${id}/${_id}`
    )
      .then((result) => {
        return {
          message: `Payment Made Successfully`,
          data: result.data.user,
        };
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};
