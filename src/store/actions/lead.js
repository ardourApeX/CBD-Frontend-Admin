import Axios from "../../utilities/Axios/Axios";
import * as actionTypes from "./actions";
import { ERROR_MESSAGE } from "./constant";
import { BACK_END_URL } from "../../utilities/Axios/url";

export const getLeadList = () => {
    return (dispatch) => {
      return Axios.get(`${BACK_END_URL}/order/cart/list`)
        .then((result) => {
          console.log(result);
          dispatch({
            type: actionTypes.GET_LEAD_LIST,
            data: result.data.data,
          });
          return `Products Fetched Successfully`;
        })
        .catch((err) => {
          console.log(err);
          return Promise.reject(ERROR_MESSAGE);
        });
    };
  };