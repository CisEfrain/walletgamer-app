/* eslint-disable prettier/prettier */
import axios from "@/services/Base.service";

interface RegisterUser {
	nombre:string,
	pass:string,
	email:string,
	activo:boolean,
	telefono:string
}

/**
 *@remarks
 * this function can be changed
 *@param nombre - string user name
 *@param pass - string user password
 *@param email - string user email
 *@param activo - boolean user status
 *@param telefono - string user phone number
 *@returns an object with jwt token and user info or error messages
 **/

const resource = "usuarios";

export const Register = async(registerUser:RegisterUser) => {
		console.info("from register service", registerUser)
		const {email, pass, nombre } = registerUser
		if (email == "" || pass == "" || nombre == "") return false;
		return await axios.post(resource, registerUser);
}
