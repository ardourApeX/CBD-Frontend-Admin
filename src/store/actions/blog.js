import Axios from "../../utilities/Axios/Axios";
import * as actionTypes from "./actions";
import { ERROR_MESSAGE } from "./constant";
export const update = (index, data) => {
	return (dispatch) => {
		return Axios.post("/Blog/update", data)
			.then((result) => {
				console.log("result update", result);
				dispatch({
					type: actionTypes.UPDATE_BLOG,

					payload: data,
					index,
				});
				return result.data.message;
			})
			.catch((err) => {
				console.log(err);
				Promise.reject(ERROR_MESSAGE);
			});
	};
};

export const get = (id) => {
	console.log("Blog get action creator");
	return (dispatch) => {
		return Axios.get("/Blog/get/" + id)
			.then((result) => {
				console.log("Result", result);
				dispatch({
					type: actionTypes.GET_BLOG,
					payload: result.data.data,
				});
				return result.data.message;
			})
			.catch((err) => {
				Promise.reject(ERROR_MESSAGE);
			});
	};
};

export const getByType = (blogTag) => {
	console.log("Blog getByTpe action creator");
	return (dispatch) => {
		return Axios.get("/Blog/get/tag/" + blogTag)
			.then((result) => {
				console.log("Result", result);
				dispatch({
					type: actionTypes.GET_BLOG_BY_TAG,
					payload: result.data.data,
				});
				return result.data.message;
			})
			.catch((err) => {
				Promise.reject(ERROR_MESSAGE);
			});
	};
};

export const Delete = (id) => {
	console.log("Blog DELETE action creator");
	return (dispatch) => {
		return Axios.get("/Blog/get/tag/" + id)
			.then((result) => {
				console.log("Result", result);
				dispatch({
					type: actionTypes.DELETE_BLOG,
				});
				return result.data.message;
			})
			.catch((err) => {
				Promise.reject(ERROR_MESSAGE);
			});
	};
};

export const getAll = (pageNo, size) => {
	console.log("Blog getAll action creator", pageNo, size);
	return (dispatch) => {
		return Axios.post("/Blog/getAll", { pageNo, size })
			.then((result) => {
				console.log("Result", result);
				dispatch({
					type: actionTypes.GET_ALL_BLOG,
					payload: result.data.data,
					pageNo,
					size,
				});
				return result.data.message;
			})
			.catch((err) => {
				Promise.reject(ERROR_MESSAGE);
			});
	};
};

export const add = (data) => {
	console.log("Add Blog:", data);
	console.log("Blog getAll action creator");
	return (dispatch) => {
		return Axios.post("/Blog/add", data)
			.then((result) => {
				console.log("Result", result);
				// dispatch({
				// 	type: actionTypes.GET_ALL_BLOG,
				// 	payload: result.data.data,
				// 	pageNo,
				// 	size,
				// });
				return result.data.message;
			})
			.catch((err) => {
				Promise.reject(ERROR_MESSAGE);
			});
	};
};
