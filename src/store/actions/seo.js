import Axios from "../../utilities/Axios/Axios";
import * as actionTypes from "./actions";
import { ERROR_MESSAGE } from "./constant";
export const update = (data, section) => {
  console.log("update actioncreator", data, section);
  return (dispatch) => {
    return Axios.post("/Seo/update", {
      data,
      id: data._id,
    })
      .then((result) => {
        console.log("result update", result);
        dispatch({
          type: actionTypes.UPDATE_SEO,
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
    return Axios.delete("/Seo/delete/"+id, { _id: id })
      .then((result) => {
        console.log("result update", result);
        dispatch({
          type: actionTypes.DELETE_SEO,
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
  console.log("SEO DTA FETCH");
  return (dispatch) => {
    return Axios.get("/Seo/get")
      .then((result) => {
        console.log("Result", result);
        dispatch({
          type: actionTypes.GET_SEO,
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
    return Axios.post("/Seo/add", data)
      .then(async (result) => {
        await dispatch({
          type: actionTypes.ADD_SEO,
          data: result.data.data,
        });
        return result.data.message;
      })
      .catch((err) => {
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};

