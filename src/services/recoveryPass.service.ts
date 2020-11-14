/* eslint-disable prettier/prettier */
import axios from "@/services/Base.service";

interface RecoveryPass {
	email:string,
}

/**
 *@remarks
 * this function can be changed
 *@param email - string user email
 *@returns an object with jwt token and user info or error messages
 **/

const resource = "recuperar-pass";

export const RecoveryPass = async(recoveryPass:RecoveryPass) => {
		const { email } = recoveryPass
		if (email == "" ) return false;
		return await axios.post(resource, recoveryPass);
}
