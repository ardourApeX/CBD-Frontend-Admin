import Axios from "../../utilities/Axios/Axios";
import * as actionTypes from "./actions";
import { ERROR_MESSAGE } from "./constant";

export const update = (dataValue, section) => {
	// console.log("update actioncreator", dataValue, section);
	return (dispatch) => {
		return Axios.post("/Home/update", {
			data: {
				[section]: dataValue,
			},
		})
			.then((result) => {
				// console.log("result update", result);
				dispatch({
					type: actionTypes.UPDATE_HOME,
					section,
					data: dataValue,
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
				return result.data.message;
			})
			.catch((err) => {
				return Promise.reject(ERROR_MESSAGE);
			});
	};
};

export const uploadImage = (data) => {
	// console.log("In image upload");
	return (dispatch) => {
		return Axios.post("/Image/add", data)
			.then((result) => {
				// console.log(result);
				return result.data.message;
			})
			.catch((err) => {
				console.log("error while upload un==mage", err);
				return Promise.reject(ERROR_MESSAGE);
			});
	};
};
