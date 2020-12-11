import Axios from "../../utilities/Axios/Axios";
import * as actionTypes from "./actions";
import { ERROR_MESSAGE } from "./constant";
export const update = (data, section) => {
  console.log("update actioncreator", data, section);
  return (dispatch) => {
    return Axios.post("/Banner/update", {
      data,
      id: data._id,
    })
      .then((result) => {
        console.log("result update", result);
        dispatch({
          type: actionTypes.UPDATE_BANNER,
          section,
          data: data,
        });
        return result.data;
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};

export const deletee = (id, section) => {
  console.log("update actioncreator", id, section);
  return (dispatch) => {
    return Axios.post("/Banner/delete", { _id: id })
      .then((result) => {
        console.log("result update", result);
        dispatch({
          type: actionTypes.DELETE_BANNER,
          section,
        });
        return result.data;
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};

export const get = () => {
  console.log("Shop get action creator");
  return (dispatch) => {
    return Axios.get("/Banner/get")
      .then((result) => {
        console.log("Result", result);
        dispatch({
          type: actionTypes.GET_BANNER,
          data: result.data.data,
        });
        return result.data.message;
      })
      .catch((err) => {
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};

export const add = (data) => {
  console.log("Shop get action creator");
  return async (dispatch) => {
    return Axios.post("/Banner/add", data)
      .then(async (result) => {
        await dispatch({
          type: actionTypes.ADD_BANNER,
          data: result.data.data,
        });
        return result.data.message;
      })
      .catch((err) => {
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};

export const uploadImage = (data) => {
  console.log("In image upload");
  return (dispatch) => {
    return Axios.post("/Banner/update", data)
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((err) => {
        Promise.reject(err.response.message);
      });
  };
};
