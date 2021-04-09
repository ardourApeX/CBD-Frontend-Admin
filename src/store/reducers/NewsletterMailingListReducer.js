import NewsletterMailingList from "../../Page/NewsletterMailingList";
import * as actionTypes from "../actions/actions";
const initialState = {
    newsletterMailingList: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.NewsletterMailingList:
        return {
          ...state,
          newsletterMailingList: action.data.data,
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  