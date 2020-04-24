import Axios from "../../utilities/Axios/Axios";
import * as actionTypes from "./actions";
import axios from "axios";
export const update = (dataValue, section) => {
	console.log("update actioncreator", dataValue, section);
	return (dispatch) => {
		return Axios.post("/Shop/update", {
			data: {
				[section]: dataValue,
			},
		})
			.then((result) => {
				console.log("result update", result);
				dispatch({
					type: actionTypes.UPDATE_SHOP,
					section,
					data: dataValue,
				});
				return result.data.message;
			})
			.catch((err) => {
				console.log(err);
				Promise.reject(err.response.data.message);
			});
	};
};

export const get = () => {
	console.log("Shop get action creator");
	return (dispatch) => {
		return axios
			.get("http://localhost:4000/Shop/get")
			.then((result) => {
				console.log("Result", result);
				dispatch({
					type: actionTypes.GET_SHOP,
					data: result.data.data,
				});
				return result.data.message;
			})
			.catch((err) => {
				Promise.reject(err.response.data.message);
			});
	};
};
