import * as actionTypes from "./actions";
import Axios from "axios";
export const login = (email, password) => {
	console.log("login actioncreator");
	return (dispatch) =>
		Axios.post("/admin/auth/signIn", { email, password })
			.then((result) => {
				localStorage.setItem("token", result.data.token);
				console.log("token", localStorage.getItem("token"));
				console.log("Data got", result.data.data);
				dispatch({
					type: actionTypes.LOGIN,
					payload: result.data.data,
				});
				return "success";
			})
			.catch((err) => {
				console.log(err);
				console.log("i came in err", err.response.data.message);
				return Promise.reject(err.response.data.message);
			});
};

export const signUp = (email, password) => {
	console.log("signUp actioncreator");
	return (dispatch) =>
		Axios.post("/admin/auth/signUp", { email, password })
			.then((result) => {
				console.log("Data got", result.data.data);
				return "Success";
			})
			.catch((err) => {
				console.log(err);
				console.log("i came in err", err.response.data.message);
				return Promise.reject(err.response.data.message);
			});
};
