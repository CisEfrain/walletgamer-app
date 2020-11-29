/* eslint-disable prettier/prettier */
import axios from "@/services/Base.service";

const resource = "desembolsos";

export const Disbursement = async (data: any):Promise<any> => {
	console.info("From disbursement service", data)
	const jwt = localStorage.getItem("jwt")
	const header = {headers:{ Authorization: "Bearer " + jwt }};
	return await axios.post(`${resource}`,data, header);
}