import axios from "axios";

const Base_URL = "http://localhost:4000/";

let instance = axios.create({
	baseURL: Base_URL,
});

instance.defaults.headers.common[
	"Authorization"
] = `Bearer ${localStorage.getItem("token")}`;

export default instance;
