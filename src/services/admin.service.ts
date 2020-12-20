/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import axios from "@/services/Base.service";

// interface User {
// 	nombre:string,
// 	pass:string,
// 	email:string,
// 	activo:boolean
// }

/**
 *@remarks
 * this function can be changed
 *@param nombre - string user name
 *@param pass - string user password
 *@param email - string user email
 *@param activo - boolean user state
 *@returns an object with jwt token and user info or error messages
 **/

const disbursements = "desembolsos";
const sells = "ventas"

export const GetAllDisbursements = async ():Promise<any> => {
		const jwt = localStorage.getItem("jwt")
		const header = {headers:{ Authorization: "Bearer " + jwt }};
		return await axios.get(disbursements, header);
}

export const UpdateDisbursement = async (id: number,data: any):Promise<any> => {
	console.info(data, id)
	const jwt = localStorage.getItem("jwt")
	const header = {headers:{ Authorization: "Bearer " + jwt }};
	return await axios.put(`${disbursements}/${id}`, data, header);
}

export const GetAllSells = async ():Promise<any> => {
	const jwt = localStorage.getItem("jwt")
	const header = {headers:{ Authorization: "Bearer " + jwt }};
	return await axios.get(sells, header);
}

export const UpdateSell = async (id: number, estado: string):Promise<any> => {
console.info(estado, id, "from updateSell service")
const jwt = localStorage.getItem("jwt")
const header = {headers:{ Authorization: "Bearer " + jwt }};
return await axios.put(`${sells}/admin/${id}/${estado}`, null, header);
}