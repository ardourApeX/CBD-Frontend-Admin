import Axios from "../../utilities/Axios/Axios";
import * as actionTypes from "./actions";
import axios from "axios";
export const update = (dataValue, section) => {
	console.log("update actioncreator", dataValue, section);
	return (dispatch) => {
		return Axios.post("/Home/update", {
			data: {
				[section]: dataValue,
			},
		})
			.then((result) => {
				console.log("result update", result);
				dispatch({
					type: actionTypes.UPDATE_HOME,
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
	console.log("Home get action creator");
	return (dispatch) => {
		return axios
			.get("http://localhost:4000/Home/get", { name: "aman" })
			.then((result) => {
				console.log("Result", result);
				dispatch({
					type: actionTypes.GET_HOME,

					data: result.data.data,
				});
				return result.data.message;
			})
			.catch((err) => {
				Promise.reject(err.response.data.message);
			});
	};
};
