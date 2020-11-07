import axios from "axios";

const baseURL = process.env.BASE_URL || "http://localhost:8080";

export default axios.create({
	baseURL
});
