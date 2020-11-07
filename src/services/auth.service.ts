import axios from "@/services/Base.service";

interface LoginUser {
  email: string;
  pass: string;
}

const resource = "login";

/**
 *@remarks
 * this function can be changed
 *@param identifier - string user or email
 *@param password - user password
 *@returns an object with jwt token and user info or error messages
 **/
export const Login = async (loginData: LoginUser) => {
  const { email, pass } = loginData;
  if (email == "" || pass == "") return false;
  return await axios.post(resource, loginData);
};
