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

const resource = "usuarios";

export const Get = async ():Promise<unknown> => {
		const jwt = localStorage.getItem("jwt")
		const header = {headers:{ Authorization: "Bearer " + jwt }};
		return await axios.get(`${resource}/me`, header);
}

export const Update = async (data: any):Promise<unknown> => {
	console.info(data)
	const jwt = localStorage.getItem("jwt")
	const header = {headers:{ Authorization: "Bearer " + jwt }};
	return await axios.put(resource, data, header);
}