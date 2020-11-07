/* eslint-disable prettier/prettier */
import axios from "@/services/Base.service";

interface RegisterUser {
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

const resource = "usuarios";

export const Register = async(registerUser:RegisterUser) => {
		const {email, pass, nombre} = registerUser
		if (email == "" || pass == "" || nombre == "") return false;
		return await axios.post(resource, registerUser);
}
