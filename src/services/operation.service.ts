/* eslint-disable prettier/prettier */
import axios from "@/services/Base.service";

const resource = "operaciones";

export const Add = async (data: any, userId: number):Promise<any> => {
	console.info(userId)
	const jwt = localStorage.getItem("jwt")
	const header = {headers:{ Authorization: "Bearer " + jwt }};
	return await axios.post(`${resource}/${userId}`,data, header);
}

export const GetOperations = async ():Promise<any> => {
		const jwt = localStorage.getItem("jwt")
		const header = {headers:{ Authorization: "Bearer " + jwt }};
		return await axios.get(`${resource}/me`, header);
}

export const Delete = async (paymentMethodId: number):Promise<any> => {
	console.info(paymentMethodId)
	const jwt = localStorage.getItem("jwt")
	const header = {headers:{ Authorization: "Bearer " + jwt }};
	return await axios.delete(`${resource}/${paymentMethodId}`, header);
}

export const GetBalance = async ():Promise<any> => {
	const jwt = localStorage.getItem("jwt")
	const header = {headers:{ Authorization: "Bearer " + jwt }};
	return await axios.get(`${resource}/saldo`, header);
}