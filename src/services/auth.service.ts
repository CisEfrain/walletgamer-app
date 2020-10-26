import axios from "@/services/Base.service";

/**
*@remarks 
* this function can be changed 
*@param identifier - string user or email
*@param password - user password
*@returns an object with jwt token and user info or error messages
**/
export const Login = async (email: string, pass: string) => {
    if (email == '' || pass == '') return false;

    return await axios.post('/login', {
        email,
        pass
    });
}