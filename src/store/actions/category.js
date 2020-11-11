import Axios from "../../utilities/Axios/Axios";
import * as actionTypes from "./actions";
import { ERROR_MESSAGE } from "./constant";
export const update = (data, section) => {
  //   console.log("update actioncreator", dataValue, section);
  return (dispatch) => {
    return Axios.post("/Category/update", data)
      .then((result) => {
        console.log("result update", result);
        dispatch({
          type: actionTypes.UPDATE_CATEGORY,
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
  //   console.log("update actioncreator", dataValue, section);
  return (dispatch) => {
    return Axios.post("/Category/delete", { _id: id })
      .then((result) => {
        console.log("result update", result);
        dispatch({
          type: actionTypes.DELETE_CATEGORY,
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
    return Axios.get("/Category/get")
      .then((result) => {
        console.log("Result", result);
        dispatch({
          type: actionTypes.GET_CATEGORY,
          data: result.data.data,
        });
        return result.data.data;
      })
      .catch((err) => {
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};

export const add = (data) => {
  console.log("Shop get action creator");
  return async (dispatch) => {
    const category = { ...data };
    console.log(category);
    console.log(data.category);
    category.category = data.category.toLowerCase();
    console.log(category);
    return Axios.post("/Category/add", category)
      .then(async (result) => {
        await dispatch({
          type: actionTypes.ADD_CATEGORY,
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
    return Axios.post("/Image/add", data)
      .then((result) => {
        console.log(result);
        return result.data.message;
      })
      .catch((err) => {
        Promise.reject(err.response.message);
      });
  };
};
