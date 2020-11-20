/* eslint-disable prettier/prettier */
import axios from "@/services/Base.service";

/**
 *@remarks
 * this function can be changed
 *@param email - string user email
 *@returns an object with jwt token and user info or error messages
 **/

const resource = "cambiar-password";

export const NewPass = async (pass: string, token: string) => {
	if (!pass || !token) return false;
	const header = { headers: { Authorization: "Bearer " + token } };
	return await axios.put(resource, { pass }, header);
}
export const RecoveryPass = async (email: string) => {
	if (!email) return false;

	return await axios.post('enviar-email-pass', { email });
} 
