/* eslint-disable prettier/prettier */
import axios from "@/services/Base.service";

/**
 *@remarks
 * this function can be changed
 *@param nombre - string user name
 *@param pass - string user password
 *@param email - string user email
 *@param activo - boolean user state
 *@returns an object with jwt token and user info or error messages
 **/

const resource = "publicaciones";


export const Add = async (data: any):Promise<unknown> => {
	const jwt = localStorage.getItem("jwt")
	const header = {headers:{ Authorization: "Bearer " + jwt }};
	return await axios.post(`${resource}`,data, header);
}

export const GetMe = async (size:any, page: any):Promise<unknown> => {
		const jwt = localStorage.getItem("jwt")
		const header = {headers:{ Authorization: "Bearer " + jwt }};
		return await axios.get(`${resource}/me?size=${size}&page=${page}`, header);
}

export const GetGold = async (size:any, page: any):Promise<unknown> => {
	const jwt = localStorage.getItem("jwt")
	const header = {headers:{ Authorization: "Bearer " + jwt }};
	return await axios.get(`${resource}?size=${size}&page=${page}&type=oro&active=1`, header);
}
export const GetCharacters = async (size:any, page: any):Promise<unknown> => {
	const jwt = localStorage.getItem("jwt")
	const header = {headers:{ Authorization: "Bearer " + jwt }};
	return await axios.get(`${resource}?size=${size}&page=${page}&type=personaje&active=1`, header);
}
export const GetItems = async (size:any, page: any):Promise<unknown> => {
	const jwt = localStorage.getItem("jwt")
	const header = {headers:{ Authorization: "Bearer " + jwt }};
	return await axios.get(`${resource}?size=${size}&page=${page}&type=item&active=1`, header);
}

export const GetAll = async ():Promise<unknown> => {
	const jwt = localStorage.getItem("jwt")
	const header = {headers:{ Authorization: "Bearer " + jwt }};
	return await axios.get(`${resource}`, header);
}

export const Delete = async (postId: number):Promise<unknown> => {
	const jwt = localStorage.getItem("jwt")
	const header = {headers:{ Authorization: "Bearer " + jwt }};
	return await axios.delete(`${resource}/${postId}`, header);
}

export const Update = async (data:any, postId: number):Promise<unknown> => {
	const jwt = localStorage.getItem("jwt")
	const header = {headers:{ Authorization: "Bearer " + jwt }};
	console.info(data, "From update post service")
	const disabledPost = { activo: data.activo }
	return await axios.put(`${resource}/${postId}`,disabledPost, header);
}