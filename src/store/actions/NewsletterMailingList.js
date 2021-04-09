import Axios from "../../utilities/Axios/Axios";
import * as actionTypes from "./actions";
import { ERROR_MESSAGE } from "./constant";
import { BACK_END_URL } from "../../utilities/Axios/url";

export const getNewsletterMailingList = () => {
    return (dispatch) => {
      return Axios.get(`${BACK_END_URL}/subscribedData/get`)//actual action (axios that fetches the list)
        .then((result) => {  //result stores the NewsletterMailingList
          console.log(result.data.data);
          dispatch({
            type: actionTypes.GET_NewsletterMailingList,
            data: result.data.data,
          });
          return `NewsletterMailingList retrieved Successfully`;
        })
        .catch((err) => {
          console.log(err);
          return Promise.reject(ERROR_MESSAGE);
        });
    };
  };