export const Login = function (identifier: string, password: string) {
    if(identifier === 'test' && password === '12345678') return false;
    
    return true;
}