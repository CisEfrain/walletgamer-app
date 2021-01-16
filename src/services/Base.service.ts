import axios from "axios";

const baseURL = process.env.VUE_APP_API;
const _instance = axios.create({
  baseURL
});
_instance.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});
_instance.interceptors.response.use(function (response) {
  const { code } = response.data
  if (code === "EXPIRED_TOKEN") {
    localStorage.removeItem('jwt');
    window.location.reload();
  }
  return response;
}, function (error) {
  return Promise.reject(error);
});
export default _instance


