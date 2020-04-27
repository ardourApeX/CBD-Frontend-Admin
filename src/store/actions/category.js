import Axios from "../../utilities/Axios/Axios";
import * as actionTypes from "./actions";
import axios from "axios";
export const update = (dataValue, section) => {
	console.log("update actioncreator", dataValue, section);
	return (dispatch) => {
		return Axios.post("/Category/update", {
			data: {
				[section]: dataValue,
			},
		})
			.then((result) => {
				console.log("result update", result);
				dispatch({
					type: actionTypes.UPDATE_CATEGORY,
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
			.get("http://localhost:4000/Category/get")
			.then((result) => {
				console.log("Result", result);
				dispatch({
					type: actionTypes.GET_CATEGORY,
					data: result.data.data,
				});
				return result.data.message;
			})
			.catch((err) => {
				Promise.reject(err.response.data.message);
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
