import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:8080/api/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};
// const getUserBoard = () => {
//   return axios.get(API_URL + "users", { headers: authHeader() });
// };
// const getEmployerBoard = () => {
//   return axios.get(API_URL + "employer", { headers: authHeader() });
// };
// const getAdminBoard = () => {
//   return axios.get(API_URL + "admin", { headers: authHeader() });
// };

const userService = {
  getPublicContent,
  getUserBoard,
  getEmployerBoard,
  getAdminBoard,
};

export default userService;