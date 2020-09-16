/**
*@remarks 
* this function can be changed 
*@param identifier - string user or email
*@param password - user password
*@returns an object with jwt token and user info or error messages
**/
export const Login = function (identifier: string, password: string) {
    if(identifier === 'test' && password === '12345678') return false;
    
    return true;
}