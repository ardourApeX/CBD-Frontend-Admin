import axios from "axios";
import { BASE_URL } from "./url";

let instance = axios.create({
	baseURL: BASE_URL,
});

instance.defaults.headers.common[
	"Authorization"
] = `Bearer ${localStorage.getItem("token")}`;

export default instance;
