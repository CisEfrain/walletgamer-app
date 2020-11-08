/* eslint-disable prettier/prettier */
import axios from "@/services/Base.service";

interface User {
	nombre:string,
	pass:string,
	email:string,
	activo:boolean
}

/**
 *@remarks
 * this function can be changed
 *@param nombre - string user name
 *@param pass - string user password
 *@param email - string user email
 *@param activo - boolean user state
 *@returns an object with jwt token and user info or error messages
 **/

const jwt = localStorage.getItem("jwt")
const resource = "usuarios";
const header = {headers:{ Authorization: "Bearer " + jwt }};

export const Get = async ():Promise<any> => {
		return await axios.get(`${resource}/me`, header);
}

export const Update = async (data: any):Promise<any> => {
	return await axios.put(resource, data, header);
}