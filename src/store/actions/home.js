import Axios from "../../utilities/Axios/Axios";
import * as actionTypes from "./actions";
import { ERROR_MESSAGE } from "./constant";

export const updloadImage = (formData, section) => {
  return (dispatch) => {
    return Axios.post("/Home/update", formData)
      .then((result) => {
        console.log("result update", result.data.data);
        dispatch({
          type: actionTypes.UPDATE_HOME,
          section: section,
          data: result.data.data,
        });
        return result.data.message;
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};

export const get = () => {
  // console.log("Home get action creator");
  return (dispatch) => {
    return Axios.get("/Home/get", { name: "aman" })
      .then((result) => {
        // console.log("Result", result);
        dispatch({
          type: actionTypes.GET_HOME,

          data: result.data.data,
        });
        // console.log(result.data.data);
        return result.data.message;
      })
      .catch((err) => {
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};

export const update = (data, section) => {
  console.log(data);
  console.log(section);
  return (dispatch) => {
    return Axios.post("/Home/update", {
      data,
      section,
    })
      .then((result) => {
        console.log("result update", result.data.data);
        dispatch({
          type: actionTypes.UPDATE_HOME,
          section: section,
          data: result.data.data,
        });
        return result.data.message;
      })
      .catch((err) => {
        console.log(err);
        return Promise.reject(ERROR_MESSAGE);
      });
  };
};
