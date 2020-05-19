import Axios from "../../utilities/Axios/Axios";
import * as actionTypes from "./actions";
import { ERROR_MESSAGE } from "./constant";

export const getPage = () => {
	return {
		type: actionTypes.GET_KEYWORD,
	};
};
